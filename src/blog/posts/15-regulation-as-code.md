---
title: "Regulation as Code: When AI Learns to Read the Rulebook"
date: 2026-09-23
description: "A bank told Kyndryl that 60% of its total cost was spent on compliance—and doing it better than the competition doesn't confer a differential advantage. The answer is not more compliance officers. It is turning the regulation itself into software. AI is already doing it."
---

# Regulation as Code: When AI Learns to Read the Rulebook

A bank told Kyndryl that 60% of its total cost was spent on compliance—and doing it better than the competition does not confer a differential advantage. Read that again. The single largest cost center in banking is something that every bank must do, none can skip, and none can win with. The entire industry spends the same enormous sum on the same enormous burden, and the output is the same: you are compliant, or you are not.

There is no third state. No bank has ever turned compliance into a product customers chose over a competitor's. No bank has ever closed a deal because its regulatory reporting was more accurate. Compliance is the ultimate table stakes—necessary, expensive, and invisible when done right.

So when a bank says 60% of its cost buys nothing but the right to operate, the question stops being "how do we do compliance better" and becomes "how do we stop doing it manually at all."

The answer is already arriving. Not through another RegTech vendor promising to save twenty percent on monitoring. Through something more fundamental: turning the regulation itself into code.

---

## The Translation Problem

Regulation is prose. Code is logic. The two do not speak the same language, and the gap between them is where most of that 60% cost lives.

A regulation arrives as a document. Sometimes a short directive. Sometimes a three-thousand-page omnibus like Dodd-Frank. It contains requirements—things a bank must do, must not do, or must verify before doing something else. Those requirements are written in natural language, full of ambiguity, cross-references, definitions that depend on other definitions, and conditions that interact with each other in ways the drafters may not have anticipated.

A compliance team reads the document. They interpret it. They translate their interpretation into internal policies. Those policies become procedures. Those procedures become controls. Those controls are tested by examiners. If the examiners disagree with the interpretation, the bank pays a fine and starts over.

The translation chain from regulation to enforcement looks like this: regulation → interpretation → policy → procedure → control → test → remediation. Every link in that chain is human labor. Every link introduces delay. Every link introduces error. And when the regulation changes, the entire chain must be rebuilt, link by link, by hand.

That is the 60%. Not the regulation itself. The translation.

---

## What AI Actually Does Here

The breakthrough is not that AI can read regulations. It can. But reading is not the hard part. The hard part is converting what it reads into something a machine can execute—code that checks whether a bank is compliant, not next quarter when the compliance team finishes its review, but now, on every transaction, in real time.

Three research efforts, published in the last eighteen months, demonstrate that this conversion is no longer theoretical.

**Compliance-to-Code** (arXiv, May 2025) built the first large-scale dataset mapping Chinese financial regulations to executable Python code. The team analyzed 361 regulations across ten domains, segmented them into 1,159 compliance units, and generated 307 Python modules implementing the checking logic. Their pipeline, FinCheck, takes raw regulatory text, extracts structured compliance requirements using a fine-tuned LLM, and generates Python code that can be run against actual financial data. The code is deterministic. It produces the same output every time. It can be audited. It can be tested. It is not a chatbot guessing at compliance—it is a program checking it.

**De Jure** (arXiv, April 2026), built by researchers at Vanguard Group, went further. Their pipeline requires no human annotation, no domain-specific prompting, and no annotated gold data. It transforms raw regulatory documents into structured, machine-readable rule sets through iterative LLM self-refinement. The system extracts typed semantic components from regulation text, evaluates them against explicit criteria, and repairs its own errors. It was tested on financial securities regulation and generalized without modification to healthcare privacy (HIPAA) and AI governance (EU AI Act). The same architecture, different regulations, same result: machine-readable rules extracted from prose.

**Governance-as-Code** (ICML 2026 workshop) built the most operationally mature version. Researchers at Boston University and UT Austin translated the EU AI Act's high-risk provisions into 43 machine-checkable criteria, deployed as Rego policy for the Open Policy Agent. Every criterion runs in CI/CD pipelines and at runtime. Every pass emits JSON-LD evidence indexed to the specific article of the regulation. The framework was deployed in two enterprise environments: a high-risk advisory chatbot processing 12,000 queries per day and a financial services compliance system processing 3,500 daily checks. When a retrieval-index rebuild shifts the embedding distribution and domain hallucination climbs from 4% to 9%, the system catches it—not because a human noticed, but because the code checked.

---

## The Inspector-Mechanic Loop

The most provocative idea comes from a January 2026 paper that proposed a new research domain: Computational Compliance for AI Regulation (CAIRC). The authors described a system with two components: an Inspector and a Mechanic.

The Inspector is an LLM (or a rule-based algorithm, or an evaluation suite) that continuously audits an AI system's compliance with regulatory requirements. It runs automatically. It produces a diagnosis: compliant or not. If not, it specifies which regulation is violated and how.

The Mechanic receives the diagnosis and fixes it. It edits the code, the data, the model weights, the documentation—whatever asset composed the violation. Then it calls the Inspector to re-check. The loop repeats until compliance is achieved.

The paper's key insight is that this loop can run at machine speed, with no human in the loop. Violations are mitigated as they occur—often before any harm is done. The authors explicitly state that requiring human approval to deploy the Mechanic's fixes "nibbles away at one of the core advantages of CAIRC."

This is where the field is heading, and it should make everyone uncomfortable. The same technology that converts regulation into code also converts code into compliance. The gap between "rule written" and "rule enforced" collapses to zero. The question is not whether this will happen—it already is. The question is who controls the loop, and what happens when the Inspector gets it wrong.

---

## What Exists Today

The academic work is ahead of the market, but the market is catching up fast.

**Kyndryl** developed a policy-as-code framework in 2025, initially for a Middle Eastern government automating trade licensing. An LLM breaks down a written policybook into a chain of discrete steps—a decision tree with more than 60 nodes. Each node is a machine-readable rule: "if X is true, move to step 2; if X is false, move to step 3." The decision at each step is binary—no room for "maybe." Kyndryl is now applying this to financial services, including KYC onboarding, with an enforceable control layer that sits between the LLM and the toolset, deterministically governing what agents are allowed to do. The control layer is the product. The LLM is the input mechanism.

**Comply** launched the first enterprise-grade Model Context Protocol (MCP) server for financial services compliance in April 2026. The ComplyAI MCP Server connects compliance intelligence to any major AI platform—Claude, Copilot, ChatGPT—letting compliance officers build custom AI agents without developers, without IT projects, and without waiting. Trade preclearance agents. Morning briefing agents. Certification and onboarding agents. Each agent is built and controlled by the compliance team, not engineering. Each action is logged. Each decision is auditable.

The Bank of Italy published research in 2025 on a multi-step prompt approach using GPT-4o to answer questions about EBA supervisory regulations. Their system retrieves actual questions presented by banks and generates automated responses, using RAG principles with explicit extraction of regulatory cross-references. The ambition: draft answers that need minimal human adjustment, delivered in hours instead of weeks.

**IBM** co-developed Regulate.AI with global pharmaceutical organizations, a multi-agent authoring tool for regulatory document creation. Not compliance checking—regulatory authoring. The system supports versioning, commenting, dependency awareness, and role-based access across the full authoring lifecycle. It is designed to operate at enterprise scale across multiple reporting use cases. The same agentic architecture that reads regulation can write it.

---

## The Recursive Problem

Here is the part that keeps CTOs up at night: the technology that converts regulation into code is itself regulated.

The EU AI Act's high-risk provisions took full effect in August 2026. Non-compliance carries penalties of up to €15 million or 3% of global annual turnover. The Act's Articles 8 through 15 presume bounded output spaces, deterministic inference, tractable data provenance, and interpretable decision boundaries. Generative systems—LLMs—violate all four assumptions simultaneously.

A retrieval-index rebuild shifts the embedding distribution. Domain hallucination climbs. A model update changes the output distribution. The system that was compliant last week is non-compliant this week, not because the regulation changed, but because the model changed.

This is the recursive problem: AI is the tool that makes regulation-as-code possible, and AI is the thing that needs to be regulated. The same LLM that converts GDPR into executable rules can hallucinate a compliance unit that does not exist. The same system that monitors regulatory changes can introduce new risk with every model update.

The Governance-as-Code team at ICML 2026 addressed this directly. Their 43 acceptance criteria run across CI/CD and runtime. Every number is written to an evidence store with its source. Framing bias becomes eight measurable proxies tested by counterfactual demographic probing—not a vague claim, but a per-feature test with an effect size. The framework does not trust the LLM. It audits it, continuously, at machine speed, against the same regulation the LLM helped translate.

The CAIRC researchers went further: the Inspector can audit itself. The loop is recursive, but the audit is independent. A separate LLM, or a rule-based system, or an evaluation suite checks the LLM that checks the regulation. Redundancy is the point.

---

## What This Means for the CTO

The CTO who reads this and thinks "we should buy a RegTech tool" has missed the point. The CTO who reads this and thinks "we should build a compliance API" is closer. The CTO who reads this and thinks "our entire compliance function is a manual translation layer between regulation and code, and that translation layer is now automatable" understands the shift.

Here is what changes:

**Compliance becomes a build problem, not a buy problem.** The bank that converts its regulatory obligations into executable code owns a living compliance system. The bank that buys a RegTech vendor's interpretation of those obligations owns someone else's translation. When the vendor's interpretation diverges from the regulator's expectation, the bank absorbs the risk. When the bank's own code diverges, it can find and fix it—because it can read its own code. It cannot read the vendor's.

**Speed of compliance becomes speed of deployment.** The bank that has regulation-as-code in place can absorb a regulatory change in days instead of months. The regulation is parsed, converted to code, tested against existing systems, and deployed. The bank that relies on manual interpretation starts a project, staffs a team, and delivers a gap analysis six weeks later. In a regulatory environment where rules change continuously, that gap is where fines live.

**The audit trail is the product.** When every compliance check is a code execution with a timestamp, an input, and an output, the audit trail writes itself. There is no "we believe we are compliant." There is "here is every check we ran, on every transaction, at every moment, and here is the result." Examiners do not need to sample. They can query. The bank that provides complete, real-time, machine-readable evidence of compliance is the bank that spends six weeks on examination instead of six months.

**The compliance function gets smaller and more powerful.** The team that converts regulation into code is smaller than the team that reads regulation and writes policies about it. But its output is more powerful: code that runs continuously, checks automatically, and produces evidence by design. The CTO who shrinks the compliance headcount while increasing compliance capability has solved the 60% problem. The CTO who simply cuts the compliance headcount has created a liability.

---

## The Uncomfortable Truth

The bank that told Kyndryl that 60% of its cost was compliance was stating a fact about the industry. Every bank spends roughly the same proportion. Every bank gets roughly the same output: compliance, or non-compliance. No bank has turned that spend into advantage.

Regulation-as-code changes the math. Not by making compliance cheaper—though it will—but by making compliance automatic. The 60% does not disappear. It shifts from human labor to machine labor. From interpretation to execution. From periodic checking to continuous verification. From "we believe" to "we know."

The CTO who builds this does not just solve a cost problem. They solve a risk problem. They solve a speed problem. They solve an audit problem. And they build something no competitor can replicate by hiring more compliance officers: a living, executable, continuously verified map between what the regulation says and what the bank does.

The regulation is already there. The code is already possible. The only question is whether the CTO reads the rulebook—or teaches the machine to read it for them.

---

## Sources

1. Kyndryl / WIRED — "I, Rulebot: How AI is turning compliance into software," March 12, 2026. wired.com
2. Compliance-to-Code (arXiv:2505.19804) — "Enhancing Financial Compliance Checking via Code Generation," May 2025. arxiv.org
3. De Jure (arXiv:2604.02276) — "Iterative LLM Self-Refinement for Structured Extraction of Regulatory Rules," April 2026. arxiv.org (Vanguard Group)
4. Governance-as-Code (ICML 2026 Workshop, AI4Law) — "Translating EU AI Act Technical Requirements into Executable Compliance Pipelines for Generative AI Systems," 2026. icml.cc
5. CAIRC (arXiv:2601.04474) — "Computational Compliance for AI Regulation: Blueprint for a New Research Domain," January 2026. arxiv.org
6. Comply — "ComplyAI MCP Server: Financial Services' First Agentic Compliance Platform," April 23, 2026. comply.com
7. Comply — "ComplyAI: Establishing a Responsible AI Governance Standard for Regulated Financial Services," March 11, 2026. comply.com
8. Bank of Italy (BIS IFC Workshop) — "A novel multi-step prompt approach for LLM-based Q&As on banking supervisory regulations," February 2025. bis.org
9. IBM — "Enabling acceleration of collaborative regulatory authoring with Regulate.AI," June 9, 2026. ibm.com
10. IBM — "Maximizing compliance: Integrating gen AI into the financial regulatory framework," August 25, 2026. ibm.com
11. KPMG — "How AI is poised to reshape compliance functions," September 2025. kpmg.com
12. LOGISAFETYBENCH (arXiv:2601.08196) — "Evaluating Implicit Regulatory Compliance in LLM Tool Invocation via Logic-Guided Synthesis," January 2026. arxiv.org
13. CTRAG (arXiv:2608.02472) — "An In-Context Retrieval-based Framework for Automated Compliance Checking using LLMs," August 2026. arxiv.org
14. Regulatory Graphs and GenAI (arXiv:2506.01093) — "Real-Time Transaction Monitoring and Compliance Explanation in Banking," June 2025. arxiv.org
15. LexGuard — AI platform for regulatory compliance automation and reporting, founded 2026. platform.tracxn.com