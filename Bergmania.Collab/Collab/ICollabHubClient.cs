using System.Collections.Generic;

namespace Bergmania.Collab.Collab
{
    public interface ICollabHubClient
    {
        // define methods implemented by client

        // note: exceptions must be sent as serialized JSON, not directly as an exception
        //   this is because we want to custom-serialize them, and you cannot tell signalR
        //   how to do it, so have to do it outside of signalR and send JSON
        
        void UpdateOnlineUsers(IEnumerable<UserRouteInfo> userInfo);
    }
}