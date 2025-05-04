import DarkNavbar from "@/components/darknavbar"
import ArticleCard from "@/components/card-article"
import Footer from "@/components/footer"

export default function DetailArticles() {
  return (
    <>
      <DarkNavbar />
      <main className="bg-white w-screen h-full pt-[100px]">
        <article className="flex flex-col justify-center mx-[160px]">
          {/* Metadata */}
          <div className="flex flex-col justify-center">
            <div className="w-full h-fit">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                <p>February 4, 2025</p>
                <span>•</span>
                <p>Created by Admin</p>
              </div>
              <h1 className="text-3xl font-semibold text-center mt-4">
                Figma's New Dev Mode: A Game-Changer for Designers & Developers
              </h1>
            </div>

            {/* Featured image */}
            <img
              src="/image.jpg"
              alt="Figma Dev Mode"
              className="w-full object-cover rounded-xl my-[40px]"
            />

            {/* Article body */}
            <div className="space-y-4 text-justify">
            <p>In the ever-evolving world of digital product design, collaboration between designers and developers has always been a crucial—yet often challenging—part of the process. In April 2025, Figma introduced Dev Mode, a powerful new feature aimed at streamlining that collaboration more than ever before.</p>
                <p>🔧 What Is Dev Mode?
Dev Mode is a new interface within Figma that provides developer-focused tools and removes unnecessary UI clutter that designers typically use. Instead, developers can view ready-to-implement specs, such as spacing, color values, font styles, and asset exports—without disrupting the design file or asking the design team for clarifications</p>
                <p>🤝 Bridging the Gap Between Design & Development
Traditionally, handing off designs involved back-and-forth communication, misunderstandings, and occasional delays. With Dev Mode, handoff becomes real-time and seamless:
Live Design Specs: Developers can inspect the design without needing additional tools or extensions.
Code Snippets: Automatically generated CSS, iOS (Swift), and Android (XML) code help speed up implementation.
Version History Access: Stay aligned with design updates without asking for a new export every time.
Integrated Comments: Developers can leave feedback directly in the design file.</p>
                <p>🚀 Why It Matters
For design teams working in agile environments, the speed of handoff can make or break a sprint. Figma’s Dev Mode turns a typically messy phase into a collaborative, real-time experience that reduces errors, shortens build times, and improves the designer-developer relationship.</p>
                <p>🧠 Final Thoughts
Whether you're a solo designer working with freelance developers or part of a large product team, Figma’s Dev Mode introduces a smoother, smarter way to collaborate. It's not just a feature—it's a shift in how digital products are built.</p>
                <p>💬 What do you think of Dev Mode? Have you tried it yet? Share your experience in the comments!</p>
            </div>
          </div>
        </article>

        {/* Other articles */}
        <div className="w-full h-fit px-[180px] pt-[40px] pb-[100px]">
            <section className="w-full h-fit flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-6">Other articles</h2>
            <div className="w-full flex flex-col justify-around items-center gap-x-6 pb-[60px] md:flex-row flex-wrap">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
            </div>
            </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
