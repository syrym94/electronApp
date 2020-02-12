using System.Net.Http;
using System.Threading.Tasks;

namespace iconExtractor
{
    class fileList
    {
        public static async Task<string> LoadJson()
        {
            using var client = new HttpClient();
            var content = await client.GetStringAsync("http://192.168.122.43:4000/files");
            return content;
        }
    }
}