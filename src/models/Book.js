export class Book {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.author = data.author
        this.description = data.description
        this.img = data.image_url
        this.reserved = data.reserved
        this.lentOut = data.lent_out
        this.isActive = data.active
        this.ownerId = data.owner_id
        this.lenderId = data.lender_id
        this.returnDate = data.return_date ? new Date(data.return_date) : null
        this.overdue = data.overdue
    }

    get isOverdue() {
        if (!this.returnDate) return false
        return this.returnDate < new Date()
    }
}