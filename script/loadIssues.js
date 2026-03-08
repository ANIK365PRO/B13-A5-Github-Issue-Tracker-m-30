
const issueContainer = document.getElementById('issueContainer')
const actionContainer = document.getElementById('actionContainer')

async function loadIssues() {
    // const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'

    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json()
    // console.log(data.data)
    displayIssues(data.data)
}
// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },

function displayIssues(issues){
    // console.log(issues)

    issues.forEach((value) => {
        const dateAuthor = new Date(value.createdAt);
        const formatted = dateAuthor.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric"
        });
        const dateAssigned = new Date(value.createdAt);
        const updated = dateAssigned.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric"
        });
        // console.log(formatted)

        // for labels 
        let labelsHTML = "";

        value.labels.forEach(label => {
            labelsHTML += `<div class="badge badge-outline ${label ==='bug'&& ('text-[#EF4444] bg-[#FEECEC] outline-[#FECACA]')} ${label === 'enhancement' && ('text-[#00A96E] bg-[#DEFCE8] outline-[#BBF7D0]')} ${(label === 'help wanted' || label === 'good first issue' || label === 'documentation') ?  ('text-[#D97706] bg-[#FFF8DB] outline-[#FDE68A]') : ''}">
            
            ${label}</div>
            `;
        });

        // console.log(value.labels)
        const card = document.createElement('div')

        card.className = "card bg-base-100 w-full shadow-sm border-t-4"
        card.classList.add(`${value.status === 'open'? 'border-[#00A96E]' : 'border-[#A855F7]' }`)

        card.innerHTML = `
                <div class="card-body ">
                    <div class="card-title justify-between">

                        ${value.status === 'open'? '<i class="fa-regular fa-circle-dot fa-fade fa-md" style="color: rgb(99, 230, 190);"></i>' : '<i class="fa-regular fa-circle-check fa-fade fa-sm" style="color: rgb(177, 151, 252);"></i>' }


                        <div class="badge ${value.priority ==='high'&& 'text-[#EF4444] bg-[#FEECEC] outline-[#FECACA]'} ${value.priority ==='medium'&& 'text-[#D97706] bg-[#FFF8DB] outline-[#FDE68A]'} ${value.priority ==='low'&& 'text-[#9CA3AF] bg-[#EEEFF2]'}">
                        ${value.priority}
                      </div>
                    </div>

                    <p class="cardTitle text-xl font-medium pt-5">${value.title}</p>
                    <p class="cardDescription font-stretch-75%">${value.description}</p>

                    <div id="actionContainer" class="card-actions">
                        
                        ${labelsHTML}
                       
                    </div>

                    <div class="divider"></div>
                    <div class="grid grid-cols-2 gap-1 space-y-3">
                        <p class="font-light">Id: ${value.id}  by ${value.author}</p>
                        <p class="font-light">${formatted}</p>
                        <p class="font-light">Assigned : ${value.assignee ? value.assignee : 'Unassigned'}</p>
                        <p class="font-light">Update : ${updated}</p>
                        
                    </div>
                </div>
        
        `
    
        issueContainer.appendChild(card)
    })
}

loadIssues()


//  <div class="badge badge-outline text-[#EF4444] bg-[#FEECEC] outline-[#FECACA]">Bug</div>
//                         <div class="badge badge-outline text-[#D97706] bg-[#FFF8DB] outline-[#FDE68A]">Help wanted</div>
//                         <div class="badge badge-outline text-[#00A96E] bg-[#DEFCE8] outline-[#BBF7D0]">Enhancement</div>