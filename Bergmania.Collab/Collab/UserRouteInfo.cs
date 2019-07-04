using System;
using Newtonsoft.Json;

namespace Bergmania.Collab.Collab
{
    public class UserRouteInfo : RouteInfo
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        
        [JsonProperty(PropertyName = "userKey")]
        public Guid UserKey { get; set; }
        
        [JsonProperty(PropertyName = "userId")]
        public int UserId { get; set; }
        
        [JsonProperty(PropertyName = "updateTime")]
        public DateTimeOffset UpdateTime { get; set; }
    }
}