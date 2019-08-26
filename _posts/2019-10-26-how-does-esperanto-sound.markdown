---
title: "How does Esperanto sound?"
date: 2019-10-26
---

When people hear Esperanto for the first time, they sometimes think they're hearing Italian, or maybe Spanish. A good amount of vocabulary in Esperanto is taken from romance roots, so this isn't totally surprising.

Once you start to meet Esperantists from other countries, you realise that there's not really a standard Esperanto accent. The rhythm and general sound of Esperanto can vary depending on the speaker's native language.

However, Esperanto has very consistent phonemes, and so despite sometimes hearing a speaker's accent come through, it's perfectly clear what they're saying. More experienced speakers often adopt a more neutral accent, making it hard to even guess where they're from.

During an [Esperanto summer school](https://ses.ikso.net/2019/en) I attended this year, my friend performed an amusing demonstration of the various accents you sometimes hear from Esperanto speakers. While his performance was super accurate and very funny, it's interesting to note that everyone (people from 22 different countries) sat and understood it perfectly well.

<iframe width="560" height="315" src="https://www.youtube.com/embed/hWPQc_UKyPU?start=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-bottom: 15px;"></iframe>

Much like the grammar of the language, the phonetics of Esperanto were designed to be simple, consistent and easy to learn.

While working on a language learning project, [Yakk](https://yakk.app), I started to wonder if Esperanto speech could be automatically generated, since it has such consistent sounds.

Initially I looked at various Text-to-Speech (TTS) engines, hoping to find that someone had trained an Esperanto voice. Unfortunately these things are usually driven by the economics of selling them, and since Esperanto (relatively speaking) is a tiny market compard to other languages, it wasn't a total shock that I didn't find anything.

I still needed audio for the courses in [Yakk](https://yakk.app), and ideally a method for creating audio that didn't involve having two humans on call for every new change or addition.

Exploring the problem further, I discovered that Slavic languages have a good overlap with the sounds found in Esperanto, especially vowel sounds. Better yet, many professional TTS engines have Polish voices.

So I began experimenting with a process for transcribing Esperanto text into a freak variant of Polish, which effectively reverse engineers the Polish engine to produce the intended sounds in Esperanto.

To my amazement, it produced quite impressive results!

Fast forward a year or so and I finally decided to put this idea into a project so that others could use it.

[Parol](https://parol.martinrue.com) is an Esperanto speech robot – a simple website that takes Esperanto text and passes it through the process mentioned above. After transcription, it passes the transcribed text into a [TTS engine](https://aws.amazon.com/polly) (via Polish voices) to generate the final Esperanto speech.

[![Image of Parol website](/images/esperanto/parol.png)](https://parol.martinrue.com)

As a bonus, I also added the ability to reconfigure the rules used for transcribing the text. Hopefully this will encourage others to find new rules for those edge cases where the engine mispronunces a word or fragment.

Curious how [Parol](https://parol.martinrue.com) sounds? Here's an example of it reading the opening section from the Esperanto page of the [Esperanto Wikipedia](https://eo.wikipedia.org):

<div style="text-align: center; padding: 20px 0;">
  <audio src="/images/esperanto/parol.mp3" controls></audio>
</div>

> Esperanto, origine la Lingvo Internacia, estas la plej disvastigita internacia planlingvo. En mil okcent okdek sep, Esperanton parolis nur manpleno da homoj; Esperanto havis unu el la plej malgrandaj lingvo-komunumoj de la mondo. Ĝi funkciis dekomence kiel lingvo de alternativa komunikado kaj de arta kreivo.
>
> La nomo de la lingvo venas de la kaŝnomo "Doktoro Esperanto", sub kiu la juda kuracisto Ludoviko Zamenhofo en la jaro mil okcent okdek sep publikigis la bazon de la lingvo.
>
> La unua versio, la rusa, ricevis la cenzuran permeson disvastiĝi en la dudek sepa de julio; ĉi tiun daton oni konsideras la naskiĝtago de Esperanto.
>
> Li celis kaj sukcesis krei facile lerneblan neŭtralan lingvon, taŭgan por uzo en la internacia komunikado; la celo tamen ne estas anstataŭigi aliajn naciajn lingvojn.

There are 3 parts to the system, all of which are open source (so feel free to do with them whatever you like):

1. The Parol website [github.com/martinrue/parol-web](https://github.com/martinrue/parol-web)
2. The speech API [github.com/martinrue/parol-api](https://github.com/martinrue/parol-api)
3. The transcription library [github.com/martinrue/vocx](https://github.com/martinrue/vocx)

And now we have yet another accent in Esperanto... a slightly robotic one, but thanks to the regular pronunciation of Esperanto, a perfectly understandable one.

So, a surprisingly useful hack, even if I do say so myself.

I hope Parol is helpful, and inspires new and interesting ideas.