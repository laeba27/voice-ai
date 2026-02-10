document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const micBtn = document.getElementById('mic-btn');
    const statusText = document.getElementById('status-text');
    const statusDot = document.querySelector('.status-dot');
    const chatArea = document.getElementById('chat-area');
    const bars = document.querySelectorAll('.bar');
    const container = document.querySelector('.container');

    // State Constants
    const STATES = {
        IDLE: 'idle',
        LISTENING: 'listening',
        PROCESSING: 'processing',
        SPEAKING: 'speaking'
    };

    let currentState = STATES.IDLE;

    // Simulation Data
    const CONVERSATIONS = [
        {
            user: "I need to prepare for my software engineer interview.",
            ai: "I can help with that. Let's start with a technical screening question. Can you explain the difference between synchronous and asynchronous code?"
        },
        {
            user: "Find me remote frontend developer jobs in New York.",
            ai: "I found 15 new listings for remote frontend developer roles in New York. Top companies include TechFlow and FutureSystems. Shall I read the first description?"
        },
        {
            user: "What are the common behavioral questions?",
            ai: "Common questions include: 'Tell me about a time you failed', 'How do you handle conflict', and 'Describe your greatest strength'. Would you like to practice one?"
        }
    ];

    let conversationIndex = 0;

    // Event Listeners
    micBtn.addEventListener('click', handleMicClick);

    function handleMicClick() {
        if (currentState === STATES.IDLE) {
            transitionTo(STATES.LISTENING);
        } else if (currentState === STATES.LISTENING) {
            // Manual stop, though the simulation usually auto-stops
            transitionTo(STATES.PROCESSING);
        }
    }

    function transitionTo(newState) {
        currentState = newState;
        updateUI();

        switch (newState) {
            case STATES.LISTENING:
                startListeningSimulation();
                break;
            case STATES.PROCESSING:
                startProcessingSimulation();
                break;
            case STATES.SPEAKING:
                startSpeakingSimulation();
                break;
            case STATES.IDLE:
                resetVisuals();
                break;
        }
    }

    function updateUI() {
        // Reset classes
        container.className = 'container';
        
        switch (currentState) {
            case STATES.IDLE:
                statusText.textContent = "Job Seeker Bot Ready";
                statusDot.classList.remove('active');
                break;
            case STATES.LISTENING:
                statusText.textContent = "Listening...";
                statusDot.classList.add('active');
                container.classList.add('listening');
                break;
            case STATES.PROCESSING:
                statusText.textContent = "Processing...";
                container.classList.add('processing');
                break;
            case STATES.SPEAKING:
                statusText.textContent = "Speaking...";
                statusDot.classList.add('active');
                break;
        }
    }

    function startListeningSimulation() {
        activateWaveform(true);
        
        // Simulate user speaking time
        setTimeout(() => {
            transitionTo(STATES.PROCESSING);
        }, 3000);
    }

    function startProcessingSimulation() {
        activateWaveform(false);
        // Simulate processing delay
        setTimeout(() => {
            addMessage(CONVERSATIONS[conversationIndex].user, 'user');
            transitionTo(STATES.SPEAKING);
        }, 1500);
    }

    function startSpeakingSimulation() {
        activateWaveform(true, 'speaking');
        
        // Add AI message with a slight delay for realism
        setTimeout(() => {
            addMessage(CONVERSATIONS[conversationIndex].ai, 'ai');
            
            // Advance conversation or loop
            conversationIndex = (conversationIndex + 1) % CONVERSATIONS.length;
            
            // Simulate reading time then go back to idle
            setTimeout(() => {
                transitionTo(STATES.IDLE);
            }, 4000);
            
        }, 500);
    }

    function resetVisuals() {
        activateWaveform(false);
    }

    function activateWaveform(active, mode = 'normal') {
        bars.forEach((bar, index) => {
            if (active) {
                // Randomize animation duration for more natural look
                bar.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
                bar.style.height = '10%';
            }
        });
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        // Avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        avatarDiv.innerHTML = sender === 'ai' 
            ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM12 20C9.33 20 6 18.66 6 16V15C6 13.9 6.9 13 8 13H16C17.1 13 18 13.9 18 15V16C18 18.66 14.67 20 12 20Z" fill="currentColor"/></svg>`
            : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/></svg>`;
            
        // Bubble
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'bubble';
        
        // Typing effect for AI
        if (sender === 'ai') {
            bubbleDiv.textContent = '';
            messageDiv.appendChild(avatarDiv);
            messageDiv.appendChild(bubbleDiv);
            chatArea.appendChild(messageDiv);
            scrollToBottom();
            
            typeText(bubbleDiv, text);
        } else {
            bubbleDiv.textContent = text;
            messageDiv.appendChild(bubbleDiv);
            messageDiv.appendChild(avatarDiv); // Avatar on right for user
            chatArea.appendChild(messageDiv);
            scrollToBottom();
        }
    }

    function typeText(element, text, index = 0) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => typeText(element, text, index + 1), 20); // Typing speed
        }
    }

    function scrollToBottom() {
        chatArea.scrollTop = chatArea.scrollHeight;
    }
});
