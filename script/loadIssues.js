const currentTab = 'all'
const issueContainer = document.getElementById('issueContainer')
const actionContainer = document.getElementById('actionContainer')

const showIssueCardDetails = document.getElementById('show_issue_card_details')

const loadingSpinner = document.getElementById('loadingSpinner')

// modal data 
const modalTitle = document.getElementById('modal_title')
const modalStatus = document.getElementById('modal_status')
const modalAuthor = document.getElementById('modal_author')
const modalCreatedAt = document.getElementById('modal_createdAt')
const modalLabels = document.getElementById('modal_labels')
const modalDescription = document.getElementById('modal_description')
const modalAssignee = document.getElementById('modal_assignee')
const modalPriority = document.getElementById('modal_priority')

function showLoading(){
    loadingSpinner.classList.remove('hidden')
    issueContainer.innerHTML = ''
}
function hideLoading(){
    loadingSpinner.classList.add('hidden')
    
}

async function switchTab(tab) {
    console.log('all tab click', tab)

    const tabActive = ['bg-[#00A96E]', 'border-#00A96E', 'text-white']
    const tabInactive = ['bg-transparent', 'border', 'text-black']

    const tabs = ['all', 'open', 'closed'];

    for(let t of tabs){
        const tabName = document.getElementById('tab_'+t);
        if( t === tab){
            tabName.classList.remove(...tabInactive)
            tabName.classList.add(...tabActive)
        }else{
            tabName.classList.remove(...tabActive)
            tabName.classList.add(...tabInactive)
        }
    }
    
   loadIssues(tab)
}

async function loadIssues(tab) {
    // const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    showLoading()
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json()
    // console.log(data.data)
    hideLoading()
    let filterData = data.data
    if(tab == 'open'){
        filterData = filterData.filter((item) => item.status == 'open')

    }else if(tab == 'closed'){
        filterData = filterData.filter(item => item.status == 'closed')

    }
    displayIssues(filterData)
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
        // console.log(value.id)

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
        card.classList.add(`${value.status === 'open'? 'border-[#00A96E]' : 'border-[#A855F7]' }` )
        

        card.innerHTML = `
                <div class="card-body "
                 onclick= "showDetailsModal(${value.id})"
                >

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

// {
// "status": "success",
// "message": "Issue fetched successfully",
// "data": {
// "id": 33,
// "title": "Add bulk operations support",
// "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "low",
// "author": "bulk_barry",
// "assignee": "",
// "createdAt": "2024-02-02T10:00:00Z",
// "updatedAt": "2024-02-02T10:00:00Z"
// }
// }
async function showDetailsModal(issueId ) {
        
    console.log(issueId)
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    const data = await res.json()
    const issueDetails = (data.data)
    
    // for assignee date 
    const dateAuthor = new Date(issueDetails.createdAt);
        const formatted = dateAuthor.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric"
        });

    // for labels 
    //  for labels 
        // let labelsHTML = "";

        // issueId.labels.forEach(label => {
        //     labelsHTML += `<div class="badge badge-outline ${label ==='bug'&& ('text-[#EF4444] bg-[#FEECEC] outline-[#FECACA]')} ${label === 'enhancement' && ('text-[#00A96E] bg-[#DEFCE8] outline-[#BBF7D0]')} ${(label === 'help wanted' || label === 'good first issue' || label === 'documentation') ?  ('text-[#D97706] bg-[#FFF8DB] outline-[#FDE68A]') : ''}">
            
        //     ${label}</div>
        //     `;
        //     // console.log(label)
        // });

    modalTitle.textContent  =  issueDetails.title
    modalStatus.textContent  = issueDetails.status
    modalAuthor.textContent  = issueDetails.author
    modalCreatedAt.textContent  = formatted
    modalLabels.textContent = issueDetails.labels
    modalDescription.textContent  = issueDetails.description
    modalAssignee.textContent  = issueDetails.assignee? issueDetails.assignee : "Unassigned"
    modalPriority.textContent  = issueDetails.priority
    showIssueCardDetails.showModal()
}

switchTab(currentTab)
loadIssues('all')
