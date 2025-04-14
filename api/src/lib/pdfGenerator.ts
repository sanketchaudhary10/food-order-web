import PDFDocument from 'pdfkit'
import { Writable } from 'stream'

export const generateOrderReceipt = async (order: any): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument()
    const chunks: Uint8Array[] = []

    const stream = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(chunk)
        callback()
      },
    })

    stream.on('finish', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)

    doc.pipe(stream)

    doc.fontSize(20).text('Pizza Order Receipt', { align: 'center' })
    doc.moveDown().fontSize(14)
    doc.text(`Order ID: ${order.id}`)
    doc.text(`User: ${order.user.email || order.userId}`)
    doc.text(`Pizza: ${order.pizza.name}`)
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`)

    if (order.toppings.length > 0) {
      doc.moveDown().text('Toppings:')
      order.toppings.forEach((t) => doc.text(`- ${t.topping.name}`))
    }

    doc.end()
  })
}
