interface String
{
   startsWith(str: string): boolean;
}


if (!String.prototype.startsWith)
{
   String.prototype.startsWith = function (str: string) : boolean
   {
      return this.indexOf(str) == 0;
   };
}