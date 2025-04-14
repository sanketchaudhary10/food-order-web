import { db } from 'src/lib/db'
import { generateOrderReceipt } from 'src/lib/pdfGenerator'
import type { APIGatewayEvent, Context } from 'src/types/functions'

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  const orderId = Number(event.queryStringParameters?.orderId)

  if (!orderId) {
    return {
      statusCode: 400,
      body: 'Missing orderId',
    }
  }

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      pizza: true,
      toppings: { include: { topping: true } },
    },
  })

  if (!order) {
    return {
      statusCode: 404,
      body: 'Order not found',
    }
  }

  const pdfBuffer = await generateOrderReceipt(order)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=receipt-order-${order.id}.pdf`,
    },
    body: pdfBuffer.toString('base64'),
    isBase64Encoded: true,
  }
}
