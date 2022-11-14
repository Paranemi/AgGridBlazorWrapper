using Newtonsoft.Json;

namespace BlazorAgGridTest.Data;

public class PeopleModel
{
    [JsonProperty("_id")]
    public string Id { get; set; }

    [JsonProperty("age")]
    public int Age { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("email")]
    public string Email { get; set; }

    [JsonProperty("address")]
    public string Address { get; set; }

    [JsonProperty("registered")]
    public DateTime Registered { get; set; }
}
