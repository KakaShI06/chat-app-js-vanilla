document.addEventListener('DOMContentLoaded', function () {
  const filterInput = document.getElementById('filter-input')
  const chatList = document.getElementById('chat-list')
  const rightSection = document.getElementById('right-section')
  const formSection = document.getElementsByTagName('form')

  // Fetch chat data from the API
  fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats')
    .then((response) => response.json())
    .then((data) => {
      // Populate the chat list
      populateChatList(data)

      // Add event listener for filter input
      filterInput.addEventListener('input', () => {
        filterChatList(data)
      })
    })
    .catch((error) => console.error('Error fetching data:', error))

  function populateChatList(chatData) {
    chatData.forEach((chat) => {
      const listItem = document.createElement('li')
      listItem.classList.add('chat-item')
      listItem.innerHTML = `
                <img src="${
                  chat.imageURL
                }" alt="Profile Picture" class="profile-picture">
                <div class="recipient-info">
                    <div class="recipient-name">${chat.title}</div>
                    <div class="last-message">${getLastMessage(
                      chat.messageList
                    )}</div>
                </div>
            `
      listItem.addEventListener('click', () => {
        displayMessages(chat, chat.title, chat.imageURL)
        const chatLists = document.getElementById('chat-list-container')
        chatLists.classList.add('active-list-view')

        const chatView = document.getElementById('right-section')
        chatView.classList.remove('inactive')
      })
      chatList.appendChild(listItem)
    })
  }

  function filterChatList(chatData) {
    const searchTerm = filterInput.value.toLowerCase()
    const filteredChats = chatData.filter((chat) =>
      chat.title.toLowerCase().includes(searchTerm)
    )
    // Clear current chat list
    chatList.innerHTML = ''
    // Populate filtered chat list
    populateChatList(filteredChats)
  }

  function getLastMessage(messageList) {
    const lastMessage =
      messageList.length > 0 ? messageList[messageList.length - 1].message : ''
    return lastMessage
  }

  function displayMessages(chat, title, url) {
    rightSection.innerHTML = ''

    const headingContainer = document.createElement('div')
    headingContainer.innerHTML = `<div class="profile-heading-container"> <img src = "${url}" class="profile-picture">  <h1>${title}</h1></div>`

    rightSection.appendChild(headingContainer)
    const innerChatElement = document.createElement('div')
    innerChatElement.classList.add('inner-chat-container')

    chat.messageList.forEach((message) => {
      const messageContainer = document.createElement('div')
      if (message?.sender === 'USER') {
        messageContainer.classList.add('message-user')
      } else {
        messageContainer.classList.add('message-bot')
      }
      messageContainer.classList.add('message-container')
      messageContainer.innerHTML = `${message.message}`
      innerChatElement.appendChild(messageContainer)
    })

    rightSection.appendChild(innerChatElement)

    const inputElement = document.createElement('form')

    inputElement.innerHTML = `<div id="input-chat-container"><input placeholder="Type of Message" id="chat-input"> <button>Submit</button></div>`

    rightSection.appendChild(inputElement)
  }


})
