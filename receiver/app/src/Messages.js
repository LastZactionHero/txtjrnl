export default {
  welcome() {
    return [
      "Welcome to txtjrnl.",
      "We’re a tool to help you capture your day, your thoughts and your feelings in an easy, familiar way.",
      "Any txt, including photos, links, GIFs and iMessage app content, sent to this number will be captured in your online jrnl, which you can access at txtjrnl.com.",
      "We suggest adding this number to your contacts, and even giving it a name in your contacts.",
      "Start journaling!"
    ]
  },

  inactive() {
    return [
      { time: { hour: 8, minute: 45 }, message: 'What would you like to accomplish today?', firstMessageOfTheDay: true },
      { time: { hour: 12, minute: 0 }, message: 'How’s it going so far?' },
      { time: { hour: 18, minute: 0 }, message: 'How did today turn out for you? What would you like to capture in your jrnl?' },
      { time: { hour: 21, minute: 0 }, message: 'Any final thoughts as you finish your day?', lastMessageOfTheDay: true }
    ]
  },

  dormant() {
    return [
      'Looks like you haven’t been journaling for a while.',
      'Revisit your journal to review your past entries and rediscover the power of journaling!'      
    ]
  }
}