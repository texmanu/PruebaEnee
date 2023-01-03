using EneeWebApi.Models;
using EneeWebApi.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("Branchs")]
    public class BranchsController : ControllerBase
    {
        private readonly IBranch _Branch;

        public BranchsController(IBranch branch)
        {
            _Branch = branch;
        }
        [HttpGet]
        [Route("GetAllBranch")]
        public async Task<IActionResult> GetAllBranch()
        {
            return Ok(await _Branch.GetAllBranchs());
        }
        [HttpGet]
        [Route("GetBranch/{Id:int}")]
        public async Task<IActionResult> GetBranch(int Id)
        {
            return Ok(await _Branch.GetBranch(Id));
        }
        [HttpGet]
        [Route("GetBranch/{Name}")]
        public async Task<IActionResult> FindName(string Name)
        {
            return Ok(await _Branch.FindName(Name));
        }
        [HttpPost]
        [Route("CreatedBranch")]
        public async Task<IActionResult> CreateBranch([FromBody] Branch branch)
        {
            if (branch == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _Branch.InserBranch(branch, branch.User_id);
            return Created("Created", created);
        }
        [HttpPut]
        [Route("UpdateBranch")]
        public async Task<IActionResult> UpdateBranch([FromBody] Branch branch)
        {
            if (branch == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _Branch.UpdateBranch(branch, branch.User_id);
            return Ok();
        }
        [HttpPut]
        [Route("DeletedBranch")]
        public async Task<IActionResult> DeleteBranch(int id, int user_id)
        {
            if (id == 0 || user_id == 0)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _Branch.DeleteBranch(id, user_id);
            return Ok();
        }

    }
}
