import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question, language } = await req.json();

    // Mock Gemini Response Logic
    // In a real app, this would call the Google Gemini API.
    let answer = "";
    
    const qLower = question.toLowerCase();

    if (qLower.includes("register")) {
      answer = language === "en" ? "You can register to vote online, by mail, or in-person at your local election office. The deadline is 30 days before the election." :
               language === "hi" ? "आप ऑनलाइन, डाक द्वारा या अपने स्थानीय चुनाव कार्यालय में व्यक्तिगत रूप से पंजीकरण कर सकते हैं। समय सीमा चुनाव से 30 दिन पहले है।" :
               "તમે ઑનલાઇન, ટપાલ દ્વારા અથવા તમારી સ્થાનિક ચૂંટણી ઑફિસમાં રૂબરૂમાં નોંધણી કરાવી શકો છો.";
    } else if (qLower.includes("document") || qLower.includes("id")) {
      answer = language === "en" ? "You'll need a valid photo ID (driver's license, state ID, or passport) and proof of residence." :
               language === "hi" ? "आपको एक वैध फोटो आईडी और निवास के प्रमाण की आवश्यकता होगी।" :
               "તમારે માન્ય ફોટો આઈડી અને રહેઠાણના પુરાવાની જરૂર પડશે.";
    } else if (qLower.includes("where")) {
      answer = language === "en" ? "You can find your polling station in the 'Polling Locator' section below. Usually, it's a nearby school or community center." :
               language === "hi" ? "आप नीचे 'मतदान केंद्र' अनुभाग में अपना मतदान केंद्र पा सकते हैं।" :
               "તમે નીચે આપેલ 'પોલિંગ લોકેટર' વિભાગમાં તમારું મતદાન મથક શોધી શકો છો.";
    } else {
      answer = language === "en" ? "That's a great question! Make sure to check your local state election website for the most accurate and up-to-date information." :
               language === "hi" ? "यह एक अच्छा सवाल है! अधिक जानकारी के लिए अपनी राज्य चुनाव वेबसाइट देखें।" :
               "આ એક સારો પ્રશ્ન છે! વધુ માહિતી માટે તમારી સ્થાનિક ચૂંટણી વેબસાઇટ તપાસો.";
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ answer });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
