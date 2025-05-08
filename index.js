import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
let currentId = 1;


app.get('/', (req, res) => {
    res.render("home.ejs", {
        posts: posts, // dynamic, user-created posts
        staticBlogs: staticBlogPosts // My pre-written static blogs
    });
});



app.get('/create', (req, res) => {
    res.render("create.ejs");
});

app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (post) {
        res.render('post-view.ejs', { 
            post: post,
            pageTitle: post.title 
         });
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/static-post/:id', (req, res) => {
    const staticPostId = req.params.id;
    const post = staticBlogPosts.find(p => p.id === staticPostId);

    if (post) {
        res.render('post-view.ejs', { post: post, pageTitle: post.title });
    } else {
        res.status(404).send('Static post not found');
    }
});


app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).send('Post not found');
    res.render('edit.ejs', { post });
});

  
app.post('/create', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).send('Title and description are required.');
    }
    
    const newPost = {
        id: currentId++,
        title: title,
        description: description,
        createdAt: new Date()
    };

    posts.push(newPost);
    console.log('New post created:', newPost);
    console.log('All posts:', posts);

    res.redirect('/');
});

app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) return res.status(404).send('Post not found');
    posts[postIndex] = { id, title, description };
    res.redirect('/');
  });  


app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== id);
    res.redirect('/');
  });  
  
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});



const staticBlogPosts = [
{
    id: 'ignite-your-spark', 
    title: 'Ignite Your Spark: Simple Ways to Boost Creativity in Your Everyday Life',
    // image: '/images/ignite-spark.png',
    snippet: "Ever feel like you're stuck in a rut, going through the motions? We all have an innate wellspring of creativity, but sometimes the demands of daily life can dampen that spark. The good news? Creativity isn't just for artists and musicians; it's a valuable skill that can enrich any aspect of your life, from problem-solving at work to finding more joy in your hobbies. And the even better news is that it can be cultivated! Ready to unleash your inner innovator? <strong>Here are some practical and fun ways to inject more creativity into your daily routine.</strong>",
    fullContent: `Ever feel like you're stuck in a rut, going through the motions? We all have an innate wellspring of creativity, but sometimes the demands of daily life can dampen that spark. The good news? Creativity isn't just for artists and musicians; it's a valuable skill that can enrich any aspect of your life, from problem-solving at work to finding more joy in your hobbies. And the even better news is that it can be cultivated!

Ready to unleash your inner innovator? <strong>Here are some practical and fun ways to inject more creativity into your daily routine.</strong>

<strong>1. Change Your Scenery (and Your Routine!)</strong>
Our brains thrive on novelty. If you're doing the same things in the same places day in and day out, it's easy for your thinking to become just as monotonous.

Work from a different spot: If you work from home, try the local library, a coffee shop, or even just a different room in your house for an hour or two. If you're in an office, see if you can use a common area or a quiet meeting room.

Take a new route: Walk, bike, or drive a different way to work or the grocery store. You'll notice new things and stimulate your brain.

Switch up your media: Listen to a new genre of music, watch a documentary on a topic you know nothing about, or pick up a magazine you'd normally ignore.

<strong>2. Embrace "Boredom" & Disconnect</strong>
In our hyper-connected world, we rarely allow ourselves to be truly bored. But boredom is often the precursor to brilliant ideas!

Schedule "un-scheduled" time: Literally block out time in your calendar for doing nothing in particular. Let your mind wander.

Digital detox: Intentionally put your phone away for an hour or two. Resist the urge to fill every spare moment with scrolling. You'll be amazed at what your mind comes up with when it's not constantly bombarded with external stimuli.

<strong>3. Engage Your Senses & Get Curious</strong>
Creativity often stems from observation and making new connections.

Mindful observation: Pick an ordinary object and really study it. What are its textures, colors, shapes, and smells? How was it made? What's its purpose?

Ask "What if?": Challenge assumptions. What if gravity worked differently? What if trees could talk? This kind of playful questioning can unlock new perspectives on real-world problems too.

Try something new with your hands: Cook a new recipe, try doodling (even if you think you "can't draw"), take up gardening, or learn a simple craft. Physical engagement can spark mental creativity.

<strong>4. Capture Your Ideas – All of Them!</strong>
Ideas are fleeting. That brilliant thought you had in the shower can vanish by the time you're toweling off.

Keep an idea journal/app: Whether it's a physical notebook, a note-taking app on your phone, or a voice recorder, have a system ready to capture thoughts, observations, and inspirations as they strike.

Don't judge prematurely: Write down even the "silly" or "bad" ideas. Sometimes these can be stepping stones to something truly innovative, or they can be combined with other ideas later.

<strong>5. Seek Inspiration from Diverse Sources</strong>
Cross-pollination of ideas is a powerful creativity booster.

Talk to different people: Engage in conversations with people outside your usual social or professional circles. Their perspectives can be incredibly enlightening.

Explore other fields: Read articles, watch talks, or learn about disciplines completely unrelated to your own. You might find surprising connections or solutions.

Visit new places (even virtually): Museums, art galleries, historical sites, natural parks – these are all treasure troves of inspiration.

<strong>Start Small, Stay Consistent</strong>
Boosting your creativity isn't about making grand, sweeping changes overnight. It's about incorporating small, consistent habits that nurture your innovative spirit. Pick one or two suggestions from this list and try them out this week. You might be surprised at how quickly you start seeing the world – and your own potential – in a new light.
`,
    createdAt: new Date('2025-05-01T10:00:00Z')
},

{
    id: 'travel-horizons-2025',
    title: 'Beyond the Beaten Path: Embracing New Travel Horizons in 2025',
    // image: '/images/travel-horizons.png',
    snippet: "Travel is far more than just ticking destinations off a list or collecting passport stamps. It's a deeply personal and often transformative experience that subtly, and sometimes profoundly, reshapes the very landscape of our inner world. When we step out of our familiar surroundings, we open ourselves up to a cascade of new sights, sounds, experiences, and perspectives that can alter how we see ourselves and the world around us.",

    fullContent: `Travel is far more than just ticking destinations off a list or collecting passport stamps. It's a deeply personal and often transformative experience that subtly, and sometimes profoundly, reshapes the very landscape of our inner world. When we step out of our familiar surroundings, we open ourselves up to a cascade of new sights, sounds, experiences, and perspectives that can alter how we see ourselves and the world around us.

One of the most immediate impacts of travel is the way it broadens our horizons. Confronted with different cultures, we begin to understand that our own way of life is just one of many valid approaches to existence. The daily rhythms of a bustling market in Marrakech, the serene contemplation in a Kyoto temple, or the vibrant communal life of a small village in the Andes all offer glimpses into alternative ways of being. These encounters challenge our preconceived notions and gently dismantle the invisible walls of our assumptions, fostering a more nuanced and empathetic understanding of humanity. We learn that there are countless ways to find joy, build community, and navigate the complexities of life.

Beyond these cultural revelations, travel inherently pushes us out of our comfort zones, which is a fertile ground for personal growth. Navigating a foreign city with an unfamiliar language, figuring out a complex public transport system, or simply ordering a meal when you don't recognize anything on the menu builds a quiet resilience. Each small challenge overcome is a testament to our adaptability and resourcefulness. These experiences teach us problem-solving skills in real-time and instill a sense of confidence that we can handle the unexpected, a skill that proves invaluable long after we've returned home.

Moreover, the connections forged while traveling often leave a lasting imprint. These might be fleeting interactions with fellow travelers sharing stories on a long train journey, or deeper bonds formed with locals who offer a window into their world with genuine hospitality. Sharing a meal, a laugh, or a moment of understanding can transcend language barriers and cultural differences, reminding us of our shared humanity. Even solo travel, often an introspective journey, can lead to a stronger connection with oneself, offering quiet moments for reflection and self-discovery away from the demands of daily routines.

The memories created during our travels become cherished parts of our personal narrative. They are not just static photographs in an album but vivid sensory experiences that can be recalled to bring comfort, inspiration, or a fresh perspective. The scent of a particular spice might transport you back to a vibrant street market, or the sound of a specific melody might evoke the feeling of a sunset watched from a mountaintop. These experiences weave themselves into the fabric of who we are, enriching our lives with a tapestry of diverse experiences.

Ultimately, travel is an investment in ourselves. It’s an education that no classroom can fully provide, teaching us about the world, about others, and, most importantly, about our own potential. It encourages curiosity, fosters empathy, builds resilience, and leaves us with a richer, more colorful understanding of the incredible diversity of life on this planet. So, when the opportunity arises, embrace the journey, for its effects unfold long after the suitcase is unpacked.
`,
    createdAt: new Date('2025-04-25T14:30:00Z')
}
];
