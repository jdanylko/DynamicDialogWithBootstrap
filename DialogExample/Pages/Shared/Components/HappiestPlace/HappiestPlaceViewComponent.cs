using Microsoft.AspNetCore.Mvc;

namespace DialogExample.Pages.Shared.Components.HappiestPlace
{
    public class HappiestPlaceViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}