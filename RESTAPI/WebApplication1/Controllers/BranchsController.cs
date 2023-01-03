using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class BranchsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
