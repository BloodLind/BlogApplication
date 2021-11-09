using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.Core.Services
{
    public class CheckObjectForNull
    {
        ///<summary>Returns false if object does not have null properties.
        ///Properties that marked with `Nullable` attribute do not influnce on result</summary>
        public static bool CheckForNull(object target)
        {
            if (target == null)
                return true;

            bool result = false;
            foreach(var propertie in target.GetType().GetProperties())
            {
                result = propertie.GetValue(target) == null;
                if (result)
                    break;
            }
            return result;
        }
    }
}
