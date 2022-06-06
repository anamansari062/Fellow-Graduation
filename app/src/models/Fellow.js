import dayjs from "dayjs"

// Model to parse the incoming data from Solana.
export class Fellow {
    constructor(publicKey, accountData) {
        this.publicKey = publicKey
        this.author = accountData.author
        this.timestamp = accountData.timestamp.toString()
        this.name = accountData.name
        this.github_username = accountData.github_username
        this.pod_number = accountData.pod_number
        this.pod_name = accountData.pod_name
        this.project = accountData.project
        this.picture_link = accountData.picture_link
            // this.token = accountData.token
    }

    get key() {
        return this.publicKey.toBase58()
    }

    get author_display() {
        const author = this.author.toBase58()
        return author.slice(0, 4) + '..' + author.slice(-4)
    }

    get created_at() {
        return dayjs.unix(this.timestamp).format('lll')
    }

    get created_ago() {
        return dayjs.unix(this.timestamp).fromNow()
    }
}