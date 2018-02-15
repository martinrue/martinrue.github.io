---
title: "ZZüy – A Lesson In Perseverance"
date: 2011-09-17
---

In the [last post](/do) I said that we actually need to do what we want to become better at, as well as reading and talking about it. But there's something else.

I remember when I was first introduced to programming by way of watching my older step brother type the then–very–confusing words `gosub` and `rem` onto a bright blue screen. It was exciting. I had no idea what this cryptic language did but I was definitely hooked.

As time went on we got a family PC and my first attempt at programming it wasn't exactly successful. As it turned out, you couldn't put BASIC in .html files, which seemed like such a good idea at the time. I quickly realised I had a lot to learn and decided I'd learn a language that I could use on the PC.

C was nothing like BASIC. It was far more exciting and looked much cooler with all its obscure syntax and low level semantics. As I started to understand things like files and sockets I became fascinated with the idea that I could build programs for other people to use.

After playing with C for a few months I felt confident enough to build something real with it, and it just so happened I had an idea I was pretty excited about. I wanted to build a simple tool that allowed two people write code together over the Internet.

There'd be two boxes. You would type your code into the box on the left, hit send and your partner would see your code in their right hand box. They could copy it across, amend it and hit send to send it back. I distinctly remember being in awe of the fact that by using a TCP socket for sending data, the other person could be on the other side of the world and this would still work – much more fun than BASIC.

So I got cosy with `socket()`, `listen()`, `bind()`, `connect()`, `send()` and `recv()`. A few weeks later I had an early version working and I couldn't wait to test it. It worked perfectly over localhost, but I wanted to see this work over the freaking phone line!

Fortunately my good friend Jacob was on hand to help. I sent him over the wonderfully small executable and gave him my IP address to connect to. I honestly could not believe it when he connected and his code appeared on my screen. I made a few changes and sent it back. It was awesome!

But then something weird happened.

Jacob's code had a series of ZZüy characters at the end. They disappeared on the next update, but then came back. I asked him about the strange characters I was seeing, but he couldn't see them. None of his code was being lost, but these extra characters were becoming very annoying.

Over the next day or two I trawled through the code line by line, desperately trying to work out how these extra characters might occur. It was tiring, and each time I thought I had found the issue, as if by magic, there they were again. I came to passionately hate the sequence of characters ZZüy. I think I still do. I'm biting on my fist right now.

It was actually a little soul destroying each time we retested a potential fix only to find it was still screwed, because after seeing those damn ZZüy characters come back, I had nothing. I had to go back through the process and find some other explanation. I like to consider myself an optimist, but a real test of that is whether you're still optimistic when you have nothing.

After another 10 or so different attempts I finally stumbled upon it. This time, I was absolutely convinced. I had been reading an article about string buffers in C when it mentioned zero–termination, and that's when it hit me. A string buffer needs to contain a zero character to signify the end of the data. It finally all made sense. Suddenly I could imagine how `strlen()` might work by counting until it found the zero. Suddenly I knew what the Hungarian word `psz` meant. And, of course, I was seeing random extra characters because the displaying of the buffer didn't know when to stop reading because there was no zero. Oh yes – this time I had definitely nailed it.

So I took the return value from `recv()` – the total number of bytes received – and used it as an index into the buffer to add the zero terminator. I compiled. I linked. Well, those happened together but I'm trying to build dramatic effect. I took the new executable and sent it across to Jacob. And then I waited.

A minute later he connected and over came his code. His particular choice of sample code this time caused a scroll bar to appear, but were those pesky ZZüy characters still there? Surely they were gone now that the buffer had been zero terminated. Surely.

I scrolled to the bottom of the box praying that I wouldn't see them. But the bastards, in all their glory, were still there. A group of 16 ZZüy characters staring back at me saying "nice try, but better luck next time loser". I couldn't believe that I'd failed yet again. Back to the drawing board.

The next few hours were shared between outbursts of crying and trying every shot–in–the–dark approach I could come up with to prevent ZZüy from ruining my life. But I persevered, and herein lies my point.

When Einstein was asked why he was so smart, he answered:

> It's not that I'm so smart, it's just that I stay with problems longer.

I may have had an abundance of ZZüy characters, but I also had the perseverance to not let this problem beat me, however unenjoyable the process was going to be. It was probably going to take much more time than I had hoped, but ultimately I knew there was an explanation waiting to be found. I just had to persevere with the problem to better understand it.

In reality everyone has their own threshold of perseverance, and we each have different factors that cause us to hit it. Some people become frustrated very quickly, hindering their ability to persevere through the problem. Others simply lose motivation due to lack of progress. The key is to use failure positively to drive perseverance. Each failure takes you a step closer to finding a solution so long as you are learning from it – the only true type of failure is quitting.

In the end, Jacob admitted that he had been adding the ZZüy characters onto the end of his code manually ever since he'd realised the zero termination stuff fixed the bug. I don't think I've ever been so mad and so happy at the same time.
