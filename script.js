function showTaskPopup() {
    document.getElementById('taskPopup').style.display = 'block';
}

function addTask() {
    var title = document.getElementById('taskTitle').value;
    var dateInput = document.getElementById('taskDate').value;
    var startTime = document.getElementById('taskStartTime').value;
    var endTime = document.getElementById('taskEndTime').value;

    var taskData = {
        title: title,
        date: dateInput,
        startTime: startTime,
        endTime: endTime    
    };


    axios.post('http://localhost:3000/addTask', taskData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response.data.message); // Log success message
    })
    .catch(error => {
        console.error('Error adding task:', error);
    });

    var formattedCurrentDate = getCurrentDate();

    // Check if dateInput is equal to the current date
    if (dateInput === formattedCurrentDate) {
        createTask(title, startTime, endTime)
    }

    document.getElementById('taskPopup').style.display = 'none';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskStartTime').value = '';
    document.getElementById('taskEndTime').value = '';
}

function createTask(title, startTime, endTime) {
    var taskElement = document.createElement('div');
    taskElement.textContent = title;
    taskElement.className = 'task';

    var startHour = parseInt(startTime.split(':')[0]);
    var endHour = parseInt(endTime.split(':')[0]);

    var allTimeSlotsContainer = document.querySelector('.all-time-slots');

    for (var i = startHour; i <= endHour; i++) {
        var hour = (i < 10) ? '0' + i : '' + i;

        var timeSlot = allTimeSlotsContainer.querySelector('[data-time="' + hour + '"]');
        timeSlot.appendChild(taskElement.cloneNode(true));
    }
}

    
    
async function initializeSlots(selectedDate) {

    if (selectedDate === null || selectedDate === undefined) {
       
        selectedDate = getCurrentDate();
    }


    // Get the container element where you want to add the time slots
    var allTimeSlotsContainer = document.querySelector('.all-time-slots');

    // Loop through each hour from 00 to 24
    for (var i = 0; i <= 24; i++) {
        // Create a new div element for each time slot
        var timeSlot = document.createElement('div');
        
        // Set the class and data-time attribute for the time slot
        timeSlot.className = 'time-slot';
        timeSlot.setAttribute('data-time', i < 10 ? '0' + i : '' + i); // Pad single digits with leading zero
        
        // Create a new span element to display the time
    var timeSpan = document.createElement('span');
    timeSpan.className = 'time-span';
    var displayTime = i % 12 === 0 ? 12 : i % 12; // Convert 24-hour format to 12-hour format
    var period = i < 12 ? 'AM' : 'PM';
    timeSpan.textContent = displayTime + ' ' + period;
    
    // Append the span to the time slot
    timeSlot.appendChild(timeSpan);
        // Append the time slot to the container
        allTimeSlotsContainer.appendChild(timeSlot);
    }

    try {
        const response = await axios.get(`http://localhost:3000/tasks?date=${selectedDate}`);
        console.log('Response from backend:', response.data);
        var currDayTasks = response.data;
        currDayTasks.forEach(entry => {
            const title = entry.title;
            const startTime = entry.start_time;
            const endTime = entry.end_time;

            createTask(title, startTime, endTime);
        });
    } catch (error) {
        console.error('Error retrieving tasks:', error);
    }

}

const dateInput = document.getElementById('curr-Date');

dateInput.addEventListener('change', async function() {
    const selectedDate = dateInput.value;
    initializeSlots(selectedDate);
    document.getElementById('currentDate').textContent = selectedDate;
    
});

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
    
initializeSlots();
document.getElementById('currentDate').textContent = getCurrentDate();
    
    
   