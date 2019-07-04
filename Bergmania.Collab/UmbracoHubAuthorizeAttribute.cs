using System;
using System.Security.Principal;
using System.Web;
using Microsoft.AspNet.SignalR;
using Umbraco.Core;
using Umbraco.Core.Composing;
using Umbraco.Core.Security;

namespace Bergmania.Collab
{
    public class UmbracoHubAuthorizeAttribute : AuthorizeAttribute
    {
        /// <summary>
        /// Default constructor
        /// </summary>
        public UmbracoHubAuthorizeAttribute()
        {
        }

        protected override bool UserAuthorized(IPrincipal user)
        {
            if (user?.Identity == null)
                return ReturnFalse();

            try
            {
                // we need the app to be running
                if (Current.RuntimeState.Level != RuntimeLevel.Run)
                    return ReturnFalse();

                // and a user to be logged in

                if (!user.Identity.IsAuthenticated)
                    return ReturnFalse();

                var backOfficeIdentity = user.Identity as UmbracoBackOfficeIdentity;

                if (backOfficeIdentity == null)
                    return ReturnFalse();

                var umbUser = Current.Services.UserService.GetUserById(Convert.ToInt32(backOfficeIdentity.Id));

                // Check for console access
                if (umbUser == null || umbUser.IsApproved == false || umbUser.IsLockedOut)
                    return ReturnFalse();

                return true;
            }
            catch
            {
                return ReturnFalse();
            }
        }

        /// <summary>
        /// Returns false and supresses the forms auth redirect if a context is available
        /// </summary>
        /// <returns></returns>
        protected bool ReturnFalse()
        {
            if (HttpContext.Current != null)
            {
                HttpContext.Current.Response.SuppressFormsAuthenticationRedirect = true;
            }

            return false;
        }

    }
}