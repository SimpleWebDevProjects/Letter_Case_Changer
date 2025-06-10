document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const notification = document.getElementById('notification');
    const aboutHeader = document.getElementById('aboutHeader');
    const aboutContent = document.getElementById('aboutContent');
    const featureCards = document.querySelectorAll('.feature-card');

    // Elements for counters
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    const outputCharCount = document.getElementById('outputCharCount');
    const outputWordCount = document.getElementById('outputWordCount');

    // Update counters
    function updateCounters() {
        const text = inputText.value;
        const output = outputText.textContent;

        // Input counters
        charCount.textContent = `Characters: ${text.length}`;
        wordCount.textContent = `Words: ${text.trim() ? text.trim().split(/\s+/).length : 0}`;
        lineCount.textContent = `Lines: ${text.split('\n').length}`;

        // Output counters
        outputCharCount.textContent = `Characters: ${output.length}`;
        outputWordCount.textContent = `Words: ${output.trim() ? output.trim().split(/\s+/).length : 0}`;
    }

    // Transform functions
    const transformers = {
        uppercase: text => text.toUpperCase(),
        lowercase: text => text.toLowerCase(),
        titlecase: text => text.replace(/\b\w/g, char => char.toUpperCase()),
        randomcase: text => {
            return text.split('').map(char => {
                return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
            }).join('');
        },
        sentencecase: text => {
            return text.replace(/(^\s*|[.!?]\s+)(\w)/g, (match, p1, p2) => {
                return p1 + p2.toUpperCase();
            });
        },
        invertcase: text => {
            return text.split('').map(char => {
                if (char === char.toUpperCase()) {
                    return char.toLowerCase();
                } else {
                    return char.toUpperCase();
                }
            }).join('');
        },
        alternatingcase: text => {
            let upper = true;
            return text.split('').map(char => {
                if (/[a-zA-Z]/.test(char)) {
                    upper = !upper;
                    return upper ? char.toUpperCase() : char.toLowerCase();
                }
                return char;
            }).join('');
        },
        reverse: text => text.split('').reverse().join('')
    };

    // Event listeners for transformation cards
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const transformType = this.getAttribute('data-transform');
            const transformed = transformers[transformType](inputText.value);
            outputText.textContent = transformed;
            updateCounters();

            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        const text = outputText.textContent;
        if (text && text !== "Your transformed text will appear here...") {
            navigator.clipboard.writeText(text).then(() => {
                // Show notification
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
            });
        }
    });

    // Clear button
    clearBtn.addEventListener('click', function() {
        inputText.value = '';
        outputText.textContent = 'Your transformed text will appear here...';
        updateCounters();
    });

    // About section hover effect
    aboutHeader.addEventListener('mouseenter', function() {
        aboutContent.classList.add('show');
    });

    aboutHeader.addEventListener('mouseleave', function() {
        aboutContent.classList.remove('show');
    });

    // Update counters as user types
    inputText.addEventListener('input', function() {
        updateCounters();
    });

    // Initialize counters
    updateCounters();
});
