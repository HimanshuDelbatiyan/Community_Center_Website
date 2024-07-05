import express, {Request, Response, NextFunction} from "express";

/**
 * This function checks user login status on each request to a specific page
 * on the basis the nav bar is changed
 * @param req
 */
export function LoginChecker(req: Request): boolean
{

    return (req.isAuthenticated() ? true : false);
}

/**
 * This method will redirect the unauthenticated user to "specified or passed route"
 * @param req
 * @param res
 * @param next
 * @param pageName
 * @constructor
 */
export  function AuthGuard(req: Request, res: Response, next: NextFunction)
{
    if(!req.isAuthenticated())
    {
        return res.redirect(`/login}`);
    }
}