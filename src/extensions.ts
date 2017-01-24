/**
 * This interface definition is used to add 'startWith' to the String 
 * class. While ES6 supports 'startsWith', not ES5. Since the project
 * is compiled in ES5, we added this code to save us some troubles. 
 */
interface String
{
   startsWith(str: string): boolean;
}

/**
 * Implementation of 'startsWith' in class String.
 */
if (!String.prototype.startsWith)
{
   String.prototype.startsWith = function (str: string) : boolean
   {
      return this.indexOf(str) == 0;
   };
}