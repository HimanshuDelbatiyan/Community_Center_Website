"use strict";
/*
THIS PAGE WILL BE RUNNING FOR ENTIRE WEBSITE.
-- REMOVE ABOVE WHEN DONE
 */
/**
 * Defining the namespace !
 */
namespace  core
{
    /**
     * Making the Class Public Using the "Export"
     */
    export  class Router
    {
        /**
         * Declaring the instance variables !
         */

        /*
        This variable will hold the active link of the website
        Mean whatever the page user present at that page pathname not URL pathname will be stored inside it !
         */
        private _activeLink:string;
        /*
        This Array will contain all the pages of the website !
         */
        private _routingTable:string[];
        /*
        This variable will hold the data of the active link !
         */
        private _linkData:string

        /**
         * Initializing the instance variables !
         */
        constructor()
        {
            this._activeLink = "";
            this._routingTable = [];
            this._linkData = "";
        }


        /**
         * Getter and Setter for all the instance variables !
         */
        public get ActiveLink():string {
            return this._activeLink;
        }

        public set ActiveLink(link:string){
            this._activeLink = link;
        }

        public get linkData():string {
            return this._linkData;
        }

        public set linkData(link:string){
            this._linkData = link;
        }

        /**
         * This method adds a new route to the routing table
         * @param router
         * @returns {void}
         */
        public Add(router:string)
        {
            /**
             * Adds the new route at the
             */
            this._routingTable.push(route);
        }

        /**
         * This method replaces the reference for the routing table with a new one
         * @param routingTable
         * @returns {void}
         */
        public AddTable(routingTable:string[]){
            this._routingTable = routingTable;
        }

        /**
         * This method finds and returns the index of the route in the routing table, otherwise it returns -1
         * @param route
         * @return {*}
         * @returns {*}
         */
        public Find(route:string):number{
            return this._routingTable.indexOf(route);
        }

        /**
         * This method removes a route form the routing table. it returns true if the route was successfully removed
         * @param route
         * @return {boolean}
         */
        public Remove(route:string): boolean{
            if(this.Find(route) > -1){
                this._routingTable.splice(this.Find(route), 1)
                return true;
            }
            return false;
        }

        /**
         * This method returns the routing table in a comma separate string (array toString default
         * @return {string}
         */
        public toString():string {
            return this._routingTable.toString();
        }


    }

}
/**
 * Creating the instance of router for the website !
 */
let router:core.Router = new core.Router();
/**
 * Adding the routes to the pages !
 * or identifier for our route to determine which page content to be displayed or fetched
 * and if the page does not exist then a 404 Page will be a gift.
 */
router.AddTable( [
    "/",
    "/home",
    "/contact",
    "/events",
    "/gallery",
    "/login",
    "/portfolio",
    "/privacy",
    "/register",
    "/services",
    "/team",
    "/terms",
    "/statistics",
    "/planning"
]);
/**
 * Getting the current path name from the address bar !
 *
 */
let route:string = location.pathname;

/**
 * This will run for each and every page as it will get the active link
 * if the "Specific Link" does not exist then active link value will be set to "404"
 *
 */                                                                        // removes the "/" from pathname !
router.ActiveLink = (router.Find(route) > -1) ? ((route === "/") ? "home" : route.substring(1)) : ("404");