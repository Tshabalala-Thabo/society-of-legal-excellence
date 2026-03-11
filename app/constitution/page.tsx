 "use client";
 
 import Navbar from "@/components/navbar";
 import Footer from "@/components/footer";
 import Image from "next/image";
 
 export default function Constitution() {
   return (
     <main>
       <Navbar />
 
       {/* Hero Section */}
       <div className="relative flex flex-col md:flex-row justify-center md:justify-end items-center overflow-hidden h-[450px] w-full">
         <div className="absolute inset-0 z-0">
           <Image
             src="/marble-building-3.webp"
             alt="Hero Background"
             fill
             className="object-cover object-top"
             priority
           />
           <div
             className="absolute inset-0 z-10"
             style={{
               background:
                 "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4))",
             }}
           />
         </div>
 
         {/* Hero Content */}
         <div className="container flex justify-center md:justify-end items-center mx-auto px-4 sm:px-6 py-4">
           <div className="relative z-20 w-full sm:w-8/12 md:w-6/12 lg:w-5/12 flex flex-col h-full text-white">
             <h1 className="text-4xl md:text-5xl font-bold mb-8 font-roboto">
               Constitution of the
               <br />
               <span className="text-primary">Society of Legal Excellence</span>
             </h1>
             <p className="text-sm sm:text-base mb-4">
               Foundational principles, governance, and objectives of SLE.
             </p>
           </div>
         </div>
       </div>
 
       {/* Body Content */}
       <section className="py-12">
         <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
           <div className="mb-12">
             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
               Constitution of the Society of Legal Excellence (SLE)
             </h2>
             <div className="h-px w-full bg-muted" />
           </div>
 
           {/* 1. NAME */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               1. Name
             </h3>
             <p className="text-muted-foreground leading-relaxed">
               The name of the organisation shall be The Society of Legal Excellence (SLE),
               hereinafter referred to as “the Organisation.”
             </p>
           </div>
 
           {/* 2. LEGAL STATUS */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               2. Legal Status
             </h3>
             <p className="text-muted-foreground leading-relaxed mb-4">
               The Society of Legal Excellence is a non-profit company (NPC) registered in
               terms of the Companies Act 71 of 2008, and a non-profit organisation (NPO)
               registered in terms of the Nonprofit Organisations Act 71 of 1997.
             </p>
             <p className="text-muted-foreground leading-relaxed">
               The Organisation operates on a non-profit and public benefit basis, with all
               income and property applied solely towards achieving its objectives.
             </p>
           </div>
 
           {/* 3. RELATIONSHIP WITH THE TRUST */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               3. Relationship with the Trust
             </h3>
             <p className="text-muted-foreground leading-relaxed mb-4">
               The Society of Legal Excellence Trust (“SLE Trust”) shall serve as the supreme
               body responsible for providing strategic direction, leadership, and asset
               oversight for the Organisation.
             </p>
             <p className="text-muted-foreground leading-relaxed mb-4">
               The Trust shall safeguard the founding principles, mission, and continuity of
               SLE, ensuring that all activities of the Organisation remain aligned with its
               non-profit and public benefit objectives.
             </p>
             <p className="text-muted-foreground leading-relaxed">
               The NPC shall implement, coordinate, and manage all operational,
               administrative, and programmatic functions of the Organisation in line with the
               policies and directives approved by the Trust.
             </p>
           </div>
 
           {/* 4. OBJECTIVES */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               4. Objectives
             </h3>
             <p className="text-muted-foreground leading-relaxed mb-4">
               The objectives of SLE are to:
             </p>
             <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
               <li>
                 Promote and advance education, training, and personal development among youth,
                 students, and learners across South Africa.
               </li>
               <li>
                 Facilitate access to career exposure, mentorship, and leadership development
                 opportunities for university students, high school learners, and extended
                 learners (second-chance programme participants).
               </li>
               <li>
                 Support initiatives aimed at enhancing academic success, employability,
                 entrepreneurship, innovation, and civic responsibility.
               </li>
               <li>
                 Partner with schools, universities, law firms, public institutions, and
                 community organisations to deliver impactful, inclusive programmes.
               </li>
               <li>
                 Undertake and support research, policy dialogue, and community outreach that
                 contribute to youth empowerment and social justice.
               </li>
               <li>
                 Promote ethical leadership, integrity, and social consciousness among students
                 and young professionals.
               </li>
               <li>
                 Administer funds, projects, and resources responsibly, ensuring transparent
                 governance and sustainable impact.
               </li>
             </ol>
           </div>
 
           {/* 5. NON-PROFIT NATURE */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               5. Non-Profit Nature
             </h3>
             <p className="text-muted-foreground leading-relaxed mb-4">
               SLE shall operate exclusively as a non-profit organisation. No member, director,
               or officer shall derive personal financial benefit from the Organisation’s funds
               or assets, except for reasonable remuneration for services rendered in the course
               of its work.
             </p>
             <p className="text-muted-foreground leading-relaxed">
               All surplus income or assets shall be used solely to further the objectives of
               the Organisation.
             </p>
           </div>
 
           {/* 6. MEMBERSHIP */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               6. Membership
             </h3>
 
             <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">
               6.1. Categories of Membership
             </h4>
             <p className="text-muted-foreground leading-relaxed mb-3">
               Membership shall be open to:
             </p>
             <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
               <li>
                 University students, particularly those within colleges of law and related
                 disciplines;
               </li>
               <li>
                 High school learners participating in SLE-supported development initiatives;
               </li>
               <li>
                 Extended learners (participants in second-chance or continuing education
                 programmes); and
               </li>
               <li>
                 Alumni, professionals, and community stakeholders who share the Organisation’s
                 vision.
               </li>
             </ul>
 
             <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">
               6.2. Admission
             </h4>
             <p className="text-muted-foreground leading-relaxed">
               Membership shall be subject to application, acceptance, and compliance with the
               Organisation’s Code of Conduct and policies.
             </p>
 
             <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">
               6.3. Termination
             </h4>
             <p className="text-muted-foreground leading-relaxed">
               Membership may be terminated for conduct inconsistent with the values, mission,
               or policies of SLE.
             </p>
           </div>
 
           {/* 7. GOVERNANCE STRUCTURE */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               7. Governance Structure
             </h3>
             <p className="text-muted-foreground leading-relaxed mb-3">
               The Organisation shall operate under the following structure:
             </p>
             <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
               <li>
                 The SLE Trust – Supreme governance and oversight body responsible for
                 strategic leadership and ensuring mission continuity.
               </li>
               <li>
                 The Board of Directors (NPC) – Responsible for operations, compliance, and
                 execution of the Trust’s strategic directives.
               </li>
               <li>
                 Management Committees and Project Units – Established by the Board to oversee
                 specific initiatives (e.g., university student programmes, high school learner
                 projects, community outreach).
               </li>
               <li>
                 Advisory Council (Optional) – Comprising external professionals, academics,
                 and alumni offering strategic advice.
               </li>
             </ol>
           </div>
 
           {/* 8. BOARD OF DIRECTORS */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               8. Board of Directors
             </h3>
 
             <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">
               8.1. Composition
             </h4>
             <p className="text-muted-foreground leading-relaxed mb-3">
               The Board shall consist of not fewer than three (3) and not more than seven (7)
               Directors appointed by the SLE Trust.
             </p>
 
             <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">
               8.2. Term
             </h4>
             <p className="text-muted-foreground leading-relaxed mb-3">
               Directors shall serve for three (3) years, renewable upon satisfactory
               performance.
             </p>
 
             <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">
               8.3. Functions
             </h4>
             <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
               <li>Execute the strategic directives of the SLE Trust;</li>
               <li>Manage and supervise the Organisation’s daily operations;</li>
               <li>Ensure compliance with all legal and financial obligations;</li>
               <li>Approve policies, programmes, and annual budgets;</li>
               <li>Report regularly to the Trust on progress and performance.</li>
             </ul>
           </div>
 
           {/* 9. MEETINGS */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               9. Meetings
             </h3>
             <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-3">
               <li>Annual General Meeting (AGM): To be held once every financial year.</li>
               <li>Board Meetings: At least quarterly.</li>
               <li>Quorum: A majority of Directors present.</li>
             </ul>
             <p className="text-muted-foreground leading-relaxed">
               Decisions shall be taken by consensus or, failing that, by a simple majority
               vote.
             </p>
           </div>
 
           {/* 10. FINANCES */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               10. Finances
             </h3>
             <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
               <li>The Organisation shall maintain accurate and transparent financial records.</li>
               <li>
                 All funds shall be deposited into an approved banking account in the name of
                 the Organisation.
               </li>
               <li>Annual financial statements shall be prepared and audited (where applicable).</li>
               <li>
                 No funds shall be distributed to any person except in line with legitimate
                 operational or project expenses.
               </li>
               <li>The financial year shall end on 31 March each year.</li>
             </ul>
           </div>
 
           {/* 11. AMENDMENTS */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               11. Amendments
             </h3>
             <p className="text-muted-foreground leading-relaxed">
               This Constitution may be amended by a two-thirds (⅔) majority of the Board of
               Directors, subject to approval by the SLE Trust, provided that no amendment
               shall allow the Organisation to operate for private gain or contrary to its
               public benefit purpose.
             </p>
           </div>
 
           {/* 12. BENEFICIARIES */}
           <div className="mb-12">
             <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
               12. Beneficiaries
             </h3>
             <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
               <li>
                 Youth, students, and learners engaged in education, training, or skills
                 development.
               </li>
               <li>
                 Graduates and early-career professionals pursuing personal and professional
                 growth.
               </li>
             </ul>
           </div>
         </div>
       </section>
 
       <Footer />
     </main>
   );
 }
 
