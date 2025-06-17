document.addEventListener('DOMContentLoaded', function() {
  // Calendar variables
  let currentDate = new Date();
  let selectedDate = null;
  const calendarDays = document.getElementById('calendar-days');
  const monthYear = document.getElementById('month-year');
  const prevMonth = document.getElementById('prev-month');
  const nextMonth = document.getElementById('next-month');
  const reminderModal = document.getElementById('reminder-modal');
  const reminderForm = document.getElementById('reminder-form');
  const selectedDateElement = document.getElementById('selected-date');
  const closeModal = document.getElementById('close-modal');
  const remindersList = document.getElementById('reminders-list');
  const notificationSound = document.getElementById('notification-sound');
  const notificationPopup = document.getElementById('notification-popup');
  const notificationTitle = document.getElementById('notification-title');
  const notificationTime = document.getElementById('notification-time');
  const notificationNotes = document.getElementById('notification-notes');
  const closeNotification = document.getElementById('close-notification');

  // Reminders storage
  let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

  // Initialize calendar
  renderCalendar(currentDate);
  renderReminders();

  // Check for notification permission
  if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    document.addEventListener('click', requestNotificationPermission, { once: true });
  }

  // Event listeners
  prevMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  closeModal.addEventListener('click', () => {
    reminderModal.style.display = 'none';
  });

  closeNotification.addEventListener('click', () => {
    notificationPopup.classList.add('hidden');
  });

  window.addEventListener('click', (event) => {
    if (event.target === reminderModal) {
      reminderModal.style.display = 'none';
    }
  });

  reminderForm.addEventListener('submit', saveReminder);

  // Check for reminders every minute
  setInterval(checkReminders, 60000);
  checkReminders(); // Check immediately on page load

  // Calendar rendering function
  function renderCalendar(date) {
    // Clear existing calendar days
    calendarDays.innerHTML = '';

    // Set month and year in header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    monthYear.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    // Get first day of month and number of days
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Get previous month's last days
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    // Create calendar grid
    // Previous month's days
    for (let i = startDay - 1; i >= 0; i--) {
      const dayElement = createDayElement(prevLastDay - i, true);
      calendarDays.appendChild(dayElement);
    }

    // Current month's days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = 
        i === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear();
      
      const dayElement = createDayElement(i, false, isToday);
      
      // Check if this day has reminders
      const checkDate = new Date(date.getFullYear(), date.getMonth(), i);
      if (hasReminders(checkDate)) {
        dayElement.classList.add('has-reminder');
      }
      
      calendarDays.appendChild(dayElement);
    }

    // Next month's days
    const totalDaysDisplayed = calendarDays.childElementCount;
    let nextMonthDays = 42 - totalDaysDisplayed; // 6 rows of 7 days = 42
    if (nextMonthDays > 7) nextMonthDays = nextMonthDays - 7; // Limit to max 6 rows

    for (let i = 1; i <= nextMonthDays; i++) {
      const dayElement = createDayElement(i, true);
      calendarDays.appendChild(dayElement);
    }
  }

  // Create a single day element for the calendar
  function createDayElement(dayNumber, isOtherMonth, isToday = false) {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    
    const daySpan = document.createElement('span');
    daySpan.textContent = dayNumber;
    dayElement.appendChild(daySpan);
    
    if (isOtherMonth) {
      dayElement.classList.add('other-month');
    } else {
      if (isToday) {
        dayElement.classList.add('current');
      }
      
      // Add click event for current month days
      dayElement.addEventListener('click', function() {
        // Remove selected class from all days
        document.querySelectorAll('.day.selected').forEach(day => {
          day.classList.remove('selected');
        });
        
        // Add selected class to clicked day
        this.classList.add('selected');
        
        // Update selected date and show modal
        selectedDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          parseInt(daySpan.textContent)
        );
        
        // Format date for display
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        selectedDateElement.textContent = selectedDate.toLocaleDateString(undefined, options);
        
        // Show modal
        reminderModal.style.display = 'block';
      });
    }
    
    return dayElement;
  }

  // Save reminder
  function saveReminder(e) {
    e.preventDefault();
    
    const title = document.getElementById('reminder-title').value;
    const time = document.getElementById('reminder-time').value;
    const email = document.getElementById('reminder-email').value;
    const notes = document.getElementById('reminder-notes').value;
    
    // Create reminder datetime
    const [hours, minutes] = time.split(':');
    const reminderDate = new Date(selectedDate);
    reminderDate.setHours(parseInt(hours), parseInt(minutes), 0);
    
    // Add reminder to array
    const reminder = {
      id: Date.now().toString(),
      title,
      date: reminderDate.toISOString(),
      email,
      notes,
      notified: false
    };
    
    reminders.push(reminder);
    
    // Save to localStorage
    localStorage.setItem('reminders', JSON.stringify(reminders));
    
    // Close modal and reset form
    reminderForm.reset();
    reminderModal.style.display = 'none';
    
    // Show toast notification
    showToast(`Reminder created: ${title}`);
    
    // Re-render calendar and reminders list
    renderCalendar(currentDate);
    renderReminders();
  }

  // Render reminders list
  function renderReminders() {
    remindersList.innerHTML = '';
    
    // Sort reminders by date
    const sortedReminders = [...reminders].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    // Only show upcoming reminders
    const now = new Date();
    const upcomingReminders = sortedReminders.filter(reminder => 
      new Date(reminder.date) >= now
    );
    
    if (upcomingReminders.length === 0) {
      const noReminders = document.createElement('li');
      noReminders.textContent = 'No upcoming reminders';
      noReminders.className = 'no-reminders';
      remindersList.appendChild(noReminders);
      return;
    }
    
    upcomingReminders.forEach(reminder => {
      const reminderDate = new Date(reminder.date);
      
      const reminderItem = document.createElement('li');
      reminderItem.className = 'reminder-item';
      reminderItem.dataset.id = reminder.id;
      
      const reminderInfo = document.createElement('div');
      reminderInfo.className = 'reminder-info';
      
      const reminderTitle = document.createElement('div');
      reminderTitle.className = 'reminder-title';
      reminderTitle.textContent = reminder.title;
      
      const reminderDateTime = document.createElement('div');
      reminderDateTime.className = 'reminder-datetime';
      
      const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
      
      reminderDateTime.textContent = 
        `${reminderDate.toLocaleDateString(undefined, dateOptions)} at ${reminderDate.toLocaleTimeString(undefined, timeOptions)}`;
      
      reminderInfo.appendChild(reminderTitle);
      reminderInfo.appendChild(reminderDateTime);
      
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>';
      deleteButton.className = 'delete-btn';
      deleteButton.addEventListener('click', () => deleteReminder(reminder.id));
      
      reminderItem.appendChild(reminderInfo);
      reminderItem.appendChild(deleteButton);
      
      remindersList.appendChild(reminderItem);
    });
  }

  // Delete reminder
  function deleteReminder(id) {
    reminders = reminders.filter(reminder => reminder.id !== id);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    renderCalendar(currentDate);
    renderReminders();
  }

  // Check if a date has reminders
  function hasReminders(date) {
    const dateString = date.toDateString();
    return reminders.some(reminder => {
      const reminderDate = new Date(reminder.date);
      return reminderDate.toDateString() === dateString;
    });
  }

  // Show toast notification
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Check for due reminders
  function checkReminders() {
    const now = new Date();
    
    reminders.forEach(reminder => {
      const reminderTime = new Date(reminder.date);
      
      // If reminder is due within the next minute and hasn't been notified
      if (!reminder.notified && 
          reminderTime <= new Date(now.getTime() + 60000) && 
          reminderTime >= new Date(now.getTime() - 60000)) {
        
        // Play notification sound
        notificationSound.play().catch(err => console.log('Audio play error:', err));
        
        // Show popup notification
        notificationTitle.textContent = reminder.title;
        notificationTime.textContent = reminderTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        
        if (reminder.notes) {
          notificationNotes.textContent = reminder.notes;
          notificationNotes.style.display = 'block';
        } else {
          notificationNotes.style.display = 'none';
        }
        
        notificationPopup.classList.remove('hidden');
        
        // Auto-hide notification after 15 seconds
        setTimeout(() => {
          if (!notificationPopup.classList.contains('hidden')) {
            notificationPopup.classList.add('hidden');
          }
        }, 15000);
        
        // Send browser notification
        if (Notification.permission === 'granted') {
          const notification = new Notification('Reminder: ' + reminder.title, {
            body: `Time: ${reminderTime.toLocaleTimeString()}${reminder.notes ? '\nNotes: ' + reminder.notes : ''}`,
            icon: '/favicon.ico'
          });
          
          // Focus window when notification is clicked
          notification.onclick = function() {
            window.focus();
            notification.close();
          };
        }
        
        // Mark as notified
        reminder.notified = true;
        localStorage.setItem('reminders', JSON.stringify(reminders));
        
        // Send email notification (in a real app, this would be handled by a server)
        if (reminder.email) {
          console.log(`Email notification would be sent to ${reminder.email} for reminder: ${reminder.title}`);
          // In a real application, you would make an API call to your server here
          // to send the email
        }
      }
    });
  }

  // Request notification permission
  function requestNotificationPermission() {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications.');
      return;
    }
    
    Notification.requestPermission();
  }
});