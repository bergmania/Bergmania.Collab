using Newtonsoft.Json;

namespace Bergmania.Collab.Collab
{
    public class RouteInfo
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        
        [JsonProperty(PropertyName = "section")]
        public string Section { get; set; }
        
        [JsonProperty(PropertyName = "tree")]
        public string Tree { get; set; }
        
        [JsonProperty(PropertyName = "method")]
        public string Method { get; set; }
        
        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }
    }
}