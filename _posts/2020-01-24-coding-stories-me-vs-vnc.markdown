---
title: "Coding Stories: Me vs. The VNC Guy"
date: 2020-01-24
---

I've told a few different coding stories over the years on this blog. I enjoy reminiscing about the silly things I used to do. So, in that vein, here's one I haven't told yet.  

I first became interested in computers, programming especially, when I was about 11. During the early years of high school I spent most of my free time screwing around with my C64 and writing BASIC, eventually cutting out some bad code I wrote with scissors. [No, really](/give-yourself-more-playtime).

Right after high school (aged ~16) kids in the UK usually go to college, where they choose 3 to 4 subjects to study before eventually moving on to university. Given I was so in love with my beige box and tape deck at home, I figured studying "computing" at college was the way to go.

I enjoyed the course more than I expected, which exposed me to Pascal and Delphi for the first time.

Between classes students could use any free machine in the computer hall. Picture the scene: a huge room, probably space for 100 people, with rows and rows of desks lined with machines – the kind where the monitor sat on top of the computer. There was a constant dull humming noise, and a dedicated mouse ball thief in constant operation. The air had a strange smell, almost as though the scent of 50-100 hormonal teenagers was being used cyclically to cool 100 P3 chips.

Despite the health risks, it was cool that I could wander into the computer hall and grab a machine whenever I had free time.

Policing the room was the IT technician, a small middle-aged man who had been selected for the role due to his aspirations of one day becoming an evil dictator. I assume. Policing is probably too weak a word – this guy loved his job. He was tasked with keeping order in the room, ensuring that nobody was using a college computer for anything untoward. 

To this day, my intuition tells me that his bonus must have been dependent on how many people he managed to kick off a machine and escort out of the room, and that it's doubtful he didn't pay off his mortgage early.

He sat in the far corner of the computer hall behind a corner desk, where one could fairly conclude that his fertile monitors had found a way to reproduce with an impressively short gestation period. It was anyone's guess whether he was actually behind them. Of course, I'm kidding... did I mention that he took his job very seriously?

The network of machines ran Windows 2000 at the time. I soon discovered that every login process ran a script that started a VNC server process using a privileged account. Whenever the IT technician made you his next target, he'd connect directly to your machine and watch you. It was creepy, and thinking about it now, most likely illegal.

Having cut my teeth with BASIC on the C64, I was now writing C and even a bit of C++. At the time, I was also really into D, believing it to be a nice overhaul of some of the things I didn't like about C++.

Most of my visits to the computer hall were to read more about D, or play with the Digital Mars D compiler. When I wasn't convincing myself that D was the future, I would write C code to hack other Win32 programs via their window handles.

Back in the good old days of Win32 programming, finding a window handle was the easy method to start hacking other programs. Unsurprisingly, all visual programs in Windows had a window, even if you couldn't see it. By writing a program that acquired the window handle (essentially a reference) of another process, you could send it messages. That allowed you to do basic things like hide/show the program's window(s), or do really cool things like cause the process to load a custom DLL into its memory space and begin executing code. You could really start to have some fun once you got into DLL injection territory. 

During the first 6 weeks of college, Detective Technician didn't bother me much, connecting briefly to my machine's VNC server only once or twice. However, one particular session must have piqued his interest. I was writing some C code to hide instances of Minesweeper (without closing them) so I could play it more easily in class, when I noticed the white VNC icon in my system tray turn black, meaning he was now watching me.

I continued coding as normal, trying to ignore him. Meanwhile, my machine was now grinding to a halt as it attempted to stream the very best frame rate it could over to one of the ridiculous number of monitors in the corner of the room. It wasn't long before it had become only slightly more resposive than a brick, so I logged off and called it a day.

Over the next few visits to the computer hall, Columbo took a very keen interest in what I was doing almost every time. After about the 4th time, I decided I needed to do something about it.

A sensible, rational person may have simply raised the issue with him or his boss directly, I admit that. I, however, have always been tempted by the challenge, and quickly talked myself into an altogether different strategy to solve the problem.

"You're nothing without that VNC server!" I told myself <strike>calmly</strike> emphatically <strike>once</strike> more than once.

I needed to kill VNC.

I started entering the computer hall with larger groups of people and sitting as far away from monitor corner as possible. That worked for a while, and bought me some time to explore ideas. 

My first attempt, I think you'll agree, was rather weak. Right-clicking the VNC system tray icon, I was met with a menu containing those magic letters E-x-i-t. Unfortunately they were written in grey outlined text. They had used the Group Policy Editor to disable the 'Exit' menu item, which I had seen done before. I also tried to kill the process from Task Manager, but of course it was invisible to me as it was running under another, more privileged account. No dice. 

VNC server runs on TCP port 5900, I remembered. My next plan was to send it intentionally malformed packets to make it crash.

That kept me busy for at least a few days while I tried to work out the protocol and sent it various forms of legitimately structured crap, hoping it would implode. In the end, that also didn't work. No dice again.

I was coming to the conclusion that I may not be able to get rid of this thing when it hit me.

"It must have a window! Maybe if I show it, it'll have a nice juicy 'Shut Down' button I can make very good use of."

Yielding my already perfected C code to locate a another process's main window handle, I indeed managed to find VNC's. It really felt like I was about to strike oil when I dispatched a `WM_SHOWWINDOW` message. Before I tell you, try to guess what appeared before me?

Nothing! 

Now I was curious... it had a window alright, but it was ignoring the messages I was sending. I double-checked my code to make sure it worked. I tested it on a few other processes and it worked just fine. I tried sending VNC's window other kinds of messages, and still nothing. 

And that's when it dawned on me!

Thanks to Charles Petzold's very heavy [book](https://www.amazon.co.uk/Programming-Windows®-Microsoft-Charles-Petzold/dp/157231995X), I'd become an avid student of how Win32 processes worked internally. Every Win32 application has a window, and as part of that it also has a 'message queue'. Messages caused by user interactions, and those sent by Windows itself are received on the message queue, and it's the responsibility of the application itself to deal with those messages.

Not too interesting by itself, but when I realised that a large enough unprocessed message queue is a heuristic for a hung process intervention by the Window Process Manager, I was sweating pure serotonin.

Without a second to spare, I was back in front of my C code getting it ready to send VNC's main window another `WM_SHOWWINDOW` message. In a loop. Forever. So, lots and lots of `WM_SHOWWINDOW` messages, which I now knew it intended to completely ignore... to its peril.

I compiled and ran 4KB of some of most liberating code I'd ever written. About 3 seconds later Windows informed me that `vncserver.exe` was not responding, making me an offer I just can't refuse.

> Do you want to end this process?

Fuck yes!

Let me tell you, the rest of that afternoon I was unbearably pleased with myself.

After a few hours spent digesting my new superpower, I had decided how I was going to use it. Simply killing his session in front of his very eyes would be too easy. I had a better idea – I'd disappear altogether.

After my [baptism of fire with socket programming](/zzuy-a-lesson-in-perseverance), I realised I could write some code that would do two things. First it would bind to the newly freed up TCP port 5900, previously occupied by an ignorant VNC server process. Second it would make a new TCP connection to a designated machine's VNC server. If the code simply proxied all data between the two sockets, Columbo would think he was connecting to me, when he'd actually be connecting to someone else entirely.

My code would act as a secret bridge between me and some other poor soul of my choosing. It was perfect.

I got started right away writing my fake VNC bridge. Columbo connected to me a few times, but I continued coding as he watched. I figured he'd have no idea what I was doing as long as I left out obvious things like port numbers, and comments I otherwise might have included, such as `// Goodbye creepy VNC spy guy`.

After a couple of days, I was really struggling to get the code to work correctly. Making matters worse, I wasn't getting much time without a black VNC icon in my system tray. While he was connected to me, it was impossible to free up the port to test my code.

If only I'd known about `netcat` at this point!

In the end, being an impatient 17-year old and seeing another white VNC server icon turn black, I'm sorry to say that I threw the plan out of the window. I opened up the code I first wrote to flood VNC's message queue and I ran it while he watched. I even waited a couple of seconds before clicking `End Process`, just to make sure he saw it.

If clicking that button didn't fully convince me it was worth it, seeing him emerge from behind his monitor fortress to fast-walk his way over to me and escort me out of the room definitely did.

In the end, they banned me from the network for 2 weeks. A fair punishment, I thought. About 3 weeks later, VNC server was no longer being run during login scripts and was nowhere to be found. I never found out whether my incident played any part in that or not, but it totally ruined my plan to become filthy rich by selling my VNC cannon to oppressed college computer halls across the country.

If you enjoyed this, you may also enjoy:

1. [ZZüy – A Lesson In Perseverance](/zzuy-a-lesson-in-perseverance)

2. [Give Yourself More Playtime](/give-yourself-more-playtime)
