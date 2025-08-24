export class Book {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.author = data.author
        this.description = data.description
        this.img = data.img
        this.reserved = data.reserved
        this.lentOut = data.lentOut
        this.isActive = data.isActive
        this.ownerId = data.ownerId
        this.lenderId = data.lenderId
        this.returnDate = data.returnDate ? new Date(data.returnDate) : null
        this.overdue = data.overdue
    }

    get isOverdue() {
        if (!this.returnDate) return false
        return this.returnDate < new Date()
    }
}