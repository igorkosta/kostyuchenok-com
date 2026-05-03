# Building products with AI

Note:
Welcome everyone. Today I'll give a balanced view of AI - not the hype, not the fear, but what's actually happening.

---

# Q&A
- How many of you use AI at work?
- What assistants do you use?
- Do you trust AI?
- Do you still write code?
- Do you feel more productive?
- How many of you think AI is a threat?


---

### The Narrative

- AI will solve everything
- AGI is around the corner
- Human-level intelligence imminent
- We will all lose our jobs
- Singularity is near
- We should be scared!

Note:
This is the dominant narrative in tech media. Every week there's a new breakthrough. But let's look at reality. Who benefits from this narrative?

AGI is imminent
- No coherent definition
- No path to general intelligence
- Narrow AI = narrow results

---

![Software Meltdown](./SoftwareMeltdown.jpeg?w=800)

---


![Dario Sam](./DarioSam.webp)

Note:
This is a very-well known fear cycle pattern that's been used in marketing for a very long time. You present people with an upcoming problem that may destroy their way of life and you give them the `solution`. Additionally to that current AI models are very good of hooking directly into you dopamine cycle.
Anthropic has been using this model very affectively to sell their products.

---

![ClaudeCode1](./claude-1.png?w=500)
![ClaudeCode2](./claude.jpeg)
[Link to post](https://www.linkedin.com/posts/thomas-wiesner_claude-coding-softwaredevelopment-activity-7449779801055244289-Z_ra)

---

### God Complex (RLHF)
![Garry Tan](./GarryTan.png)

Note:
RLHF - Reinforcement Learning from Human Feedback
https://www.youtube.com/watch?v=Q6nem-F8AG8

---

### Trendslop (HBR)
>Researchers Asked LLMs for Strategic Advice. They Got “Trendslop” in Return.

![Trendslop](./trendslop.png?w=500)

[Link to post](https://hbr.org/2023/01/researchers-asked-llms-for-strategic-advice-they-got-trendslop-in-return)

Note:
https://www.youtube.com/watch?v=nDL3Ch7Nz8c

---

### Allbirds

![All Birds](./allbirds.webp?w=1000)

[CNBC](https://www.cnbc.com/2026/04/15/allbirds-bird-stock-shoes-ai.html)

Note:
Allbirds made a surprising announcement Wednesday that it is pivoting from shoes to artificial intelligence.
The move boosted shares of the miniscule market cap company — it was valued at about $21 million at Tuesday’s close — by 582%. The shares, which were under $3 a day ago, jumped to about $17.

---

### Industries

- Banking & Credit Scoring
- Healthcare & Diagnostics
- Legal & Courts
- Insurance Underwriting
- HR & Hiring Decisions
- Criminal Justice
- Government Benefits

Note:
Industries that safeguard their code.
---

### Amplifier

![Developers](./senior-juniors.png?w=1000)

---
## Fast code era
- Similar to fast fashion
- All websites look the same
- No personalization
- Throw away code
- Every year - new `fashion`
---

## Keep the human in the loop
- Humans have `still` more context
- Humans have `still` more experience
- Humans have more attachment and always will

Note:
Yes, we forget stuff, but we also remember stuff very fast. Humans understand better why certain choices have been made.
Yes, there are attempts for LLMs to use the history, to memorize certain stuff but still LLM doesn't now how you solved certain problems and why you've things in a certain way.

---

## Quality code
- Read the code you AI agent writes
- Keep the context short
- Write the critical code yourself (with the help of AI)
- Focus on the real problems

Note:
What is a quality code for you? The code that is readable, easy to understand and easy to change?
If you build your codebase on the premise that it will only be read by a code assistant - then does the readibility even matters?

What happens with the codebase that's been `vibe-coded` for 6 months without the human oversight? :)

AKA if you don't want your code to totally suck in 2-3 months of spitting garbage.

Models learn from all the shitcode we wrote. You don't find a lot of gems on the internet - just remember stack overflow. 90% of the code is garbage.

If you let your agents to write the whole code without reviewing, you will end up with a enterprise grade complexity in 2 to 3 weeks with 2 people and 10 agents.

Once the bugs will pile up and your customers will start calling - who is going to deal with the issues?

If you stop writing the code, you will lose the sense of what good code actually looks like.
---

## Problems

- Reliability & accuracy
- Hallucinations
- Non-deterministic
- Understanding context

Note:
What are the main problems that you may encounter when using AI-generated code without the human oversight.

1. Context blindness - AI can only see a limited window of your codebase (typically a few thousand lines), so it generates code without understanding downstream dependencies, existing patterns, or system-wide architecture.
2. Logic & correctness errors - Studies show AI-generated PRs have ~75% more logic/correctness issues than human-only PRs. The code looks syntactically correct but produces wrong results.
3. Security vulnerabilities - AI-assisted tools led to a ~24% increase in security vulnerabilities in code. AI doesn't inherently understand threat models or secure coding practices.
4. Error handling gaps - Missing exception handling and edge cases are nearly twice as common in AI-generated code compared to human-written code.
5. No verification built-in - AI confidently generates code that compiles but is incorrect. There's no self-checking mechanism.
6. Context ceiling degradation - LLM accuracy drops significantly as context increases. Claude 3.5 Sonnet drops from 29% accuracy at 10K tokens to just 3% at 1M tokens.
7. Invisible dependencies - 73% of AI completions compile locally but violate patterns elsewhere in the codebase.
---

## A Pragmatic View

- Tool, not magic
- Amplifier, not replacement
- Requires human judgment
- Still limited

Note:
- Tool, not magic although it may feel like one.
- Great amplifier of your skills
- Requires human oversight and steering
-
---

## What Matters

- Understanding limitations
- Appropriate skepticism
- Focus on real problems
- Practical applications

Note:
---

