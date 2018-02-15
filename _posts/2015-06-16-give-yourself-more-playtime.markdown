---
title: "Give Yourself More Playtime"
date: 2015-06-16
---

I remember my first computer fondly. As a kid I was more than addicted to the Commodore 64 – perfectly happy to sit and endure at least 5 minutes of the most colourful, potentially epileptic [attack](https://www.youtube.com/watch?v=MmPpl6UMuH0) you can imagine, simply to have a few games of Boulder Dash. It was worth every photon, without a doubt.

Today its mechanical keyboard, beige plastic casing, and whopping 64 KB of memory condemns it almost exclusively to a quiet life of nostalgia... and some weird Internet forums. But back then it was the most fascinating thing 11-year-old me had ever seen.

Between games of Boulder Dash, sheer curiosity would keep bringing me back to this bright blue screen with hideous white text, wondering what else it could do. Gradually I discovered new commands that made it do other things, besides just `LOAD` – although I still typed that often enough to cause the dog to eat a lot of my homework.

In time I realised that the machine could run code called BASIC, and that I could simply type it in and then type `RUN` to make it do things. Being 11 and fearing the inevitably gradual violation of personal privacy by government, the first program I wrote was a password program.

It wasn't very clever. Not even a bit, in fact:

```
10 PRINT "ENTER PASSWORD"
20 INPUT L$
30 IF L$ = "SECRET" THEN GOTO 50
40 GOTO 10
50 PRINT "OK"
```

Well, that was until I realised something insanely awesome. You probably don't think it's insanely awesome, but I definitely did when I was 11.

Armed with the knowledge that typing `LOAD` triggered loading the first program from the datasette, I figured that if `LOAD` became my new line `50`, this program could protect my computer from the government.

It's 11-year-old genius in front of your very eyes. The plan was simple: I type this program and follow it with a swift `RUN` command. My code starts running and loops until someone types the correct password. When they do, rather than the imaginatively corrupt `PRINT "OK"`, it runs `LOAD` and begins loading whichever game is in the datasette.

Man, I was impressed with myself.

Well, until I realised you could just turn the computer off and back on again, type `LOAD`, and completely subvert my entire plan.

Obviously, the government would figure that out, so I needed something better.

After some careful thought, it became clear to me that the program needed to be on the actual tape, not sitting around in memory waiting to suicide as soon as the power went out.

Luckily I discovered the sibling of `LOAD`, `SAVE`, which allowed me to do just that. So, I typed my password program once again, inserted a blank cassette and ran `SAVE`.

```
SAVING
READY.
```

Sweet Jesus, it worked.

I released the `RECORD` and `PLAY` keys on the datasette, pressed `REWIND` and rebooted. Yes, if you wanted to run your program again you'd have to rewind it... and that wasn't the only awesome thing about the 90s.

As the computer came back to life, I was sat there with my `LOAD` command at the ready. Without even so much as a colour leaping out of the screen and smashing me in the face, my password program was running!

Still, it would be a pretty big ask to get the government to take out the game they wanted to load, put my password program cassette in, and run that first. I mean, I could write some instructions, but I just don't think it's very likely they would follow them.

So, onto my next wave of genius. I noticed something interesting: this Joseph and the Amazing Technicolor Dreamcoat light show that happens when a game is loading doesn't begin immediately after running `LOAD`.

In other words, the tape is spinning but nothing is happening for about 5 seconds. Conveniently, my awesome password program took about 1 second to write to a blank tape. If my maths was correct, I had plenty of space at the beginning of Boulder Dash to stash my own program.

Now I was really getting somewhere! MI5 were probably shitting their pants, I figured.

At my earliest inconvenience I invited a friend over to see my achievement. He had a Commodore 64 too, so I knew he'd appreciate what I'd done here.

He loads my tape. We wait. And BOOM!

```
ENTER PASSWORD
```

I knew he was impressed.

Well, I think he was. There wasn't much time between the password prompt appearing and him pressing the `RUN/STOP` key, typing `LIST` and reading the *god damned password* right out of the code.

Obviously, the government would figure that out too, so I needed something better.

My new target swiftly became that damn `RUN/STOP` key. It took me a few days until I got the chance to dial up to the Internet (yes, that was a thing too) and search for a way to stop my *friends*, and the government, breaking my code and listing it to read the password.

Eventually I learned that `POKE` allows you to change values at specific memory addresses, and with that it's possible to overwrite vectors to prevent routines such as `LIST` and `STOP` from working.

With my newfound `POKE` tool, my password program was now solid. It was time to write this baby to the game tape, making absolutely sure nobody in my family could get better than me at Boulder Dash.

I was so impressed with my new skill that I didn't just stop at Boulder Dash. In fact, I password protected every single one of my favourite game tapes using the same program, quickly rising to fame as the family gatekeeper of any game worth playing.

It was coming up to summer, and another thing we did as 11-year-old kids in the 90s was go outside in summer. Weird, I know.

4 or 5 weeks of being a healthy 90s outdoor summer kid and I found myself ready for a nice game of Boulder Dash.

Wouldn't it have been amusing had I completely forgot whatever eventual password I securely wrote to the start of *every single one* of my favourite games?

Well, it wasn't amusing. Not one bit.

After brute-forcing approximately every password I had ever used, in every possible combination, and breaking down a few times, I was at a loss.

It occurred to me that I could attempt to overwrite the current password program with a new one, but I was worried that if the program was shorter for some reason, it'd leave the overlap of code from the previous program and trash the only copy of the game I owned.

Ruling out overwriting the old program, I needed another solution. Then it hit me. It's a tape!

You know what they say?

> Never trust a programmer that carries a screwdriver.

I'm not sure if *screwdriver* and *scissors* are interchangeable in this context, but I definitely wasn't to be trusted in any case, so it doesn't really matter.

The key here was that the datasette would stop moving the tape once the password program had been loaded.

That gave me a good idea which area of the tape contained the not-so-awesome-afterall program, that I was now planning on cutting. Literally, cutting out.

A bit of precision and a couple of attempts later, I had successfully hacked my first ever program, using a pair of scissors. With great pride, Boulder Dash rose again, and I still sucked at it.

Looking back, I wish I had used my teeth instead of scissors – being able to tell people I cut some code from a program by biting it out would have been nice.

---

I've told this story a few times before. It's pretty fun to tell and I like reminding myself of all the silly things I used to do.

But the moral of the story is that, while on some level all this is kind of silly, on another it's important too.

It's play. It's something we tend to do more often as kids and lose as we become older. Being older, we feel the need to be doing something justifiably *productive* with our time, as though the pursuit of actual or seemingly meaningless things is wasted time.

Sometimes it's good to not concern ourselves with whether it's productive or not and just enjoy the experience. Being in this frame of mind frees you from any prescribed approach or goal, and leaves you open to discovering things you never would have any other way.

So if you take anything away from this story, take this:

Give yourself more playtime and do silly things. It doesn't always have to be useful. It doesn't always have to be justified.

Play around more. Discover things.
