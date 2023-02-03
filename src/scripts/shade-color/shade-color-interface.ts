/*
* Your Util must have a TypeScript interface. Use this file to create it
* Don't forget to add a brief JSDoc comment above all params. 
* Make sure to include all useful information inside your comment and to use JSDoc tags where necessary (deprecation, throwables, etc.)
*/

export default interface ShadeColorInterface {
  /*
 * These are the arguments your util accepts
 */
  (
    /**
    * Hexidecimal color that you'd like to darken or lighten
    */
    color: string,
    /**
    * Percentage that you'd like to lighten (positive number) or darken (negative number)
    */
    percent: number
  ):
    /**
    * returns altered color
    */
    string
}