using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace HttpClientJson
{
    // class Contributor
    // {
    //     public string Login { get; set; }
    //     public short Contributions { get; set; }

    //     public override string ToString()
    //     {
    //         return $"{Login,20}: {Contributions} contributions";
    //     }
    // }

    class Program
    {
        private static async Task Main()
        {
            using var client = new HttpClient();

            // client.BaseAddress = new Uri("https://192.168.1.122:4000");
            // client.DefaultRequestHeaders.Add("User-Agent", "C# console program");
            // client.DefaultRequestHeaders.Accept.Add(
            //         new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync("http://192.168.1.122:4000/messages");
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync();

            // List<Contributor> contributors = JsonConvert.DeserializeObject<List<Contributor>>(resp);
            Console.WriteLine(resp);
        }
    }
}