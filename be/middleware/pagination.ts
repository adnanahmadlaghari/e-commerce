import type {Response, NextFunction } from "express"

const pagination_middleware = (pageSize: number) => {
    return (req: any, res: Response, next: NextFunction) => {
        const page_number = parseInt(req.query.page) || 1
        const start_idx = (page_number - 1) * pageSize
        const end_idx = start_idx + pageSize

        req.pagination = {
            page_number,
            pageSize,
            start_idx,
            end_idx
        }

        next()
    }
}

export default pagination_middleware