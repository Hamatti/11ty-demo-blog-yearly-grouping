module.exports = async function(eleventyConfig) {
  // Create a new collection that can be accessed in templates
  eleventyConfig.addCollection('byYear', collection => {
	  // Find all Markdown posts in blog folder.
	  // You need to adjust this glob pattern to match your
	  // folder structure.
    const allPosts = collection.getFilteredByGlob('blog/*.md');
    
    // Create an empty object for our new collection
    const byYear = {};
    
    // Go through all original posts
    allPosts.forEach(post => {
      // Assuming there's a date field in front matter for each post
      const date = new Date(post.data.date);
      const year = date.getFullYear();
      
      // If current year has not been encoutered yet,
      // create a new entry
      if(!byYear[year]) {
        byYear[year] = [];
      }
      
      // Add post to the corresponding year
      byYear[year].push(post);
    });
    
    // Our posts are now grouped by year so
    // let's return it as the new collection
    return byYear;
  });

  eleventyConfig.addCollection('byMonth', collection => {
    const allPosts = collection.getFilteredByGlob('blog/*.md');
    const grouped = {}
    
    allPosts.forEach(post => {
        const date = new Date(post.data.date);
	const year = date.getFullYear();
	const month = date.getMonth();
	
	if(!grouped[year]) { grouped[year] = {} }
	if(!grouped[year][month]) { grouped[year][month] = [] }

	grouped[year][month].push(post)
    });
   console.log({grouped})
   return grouped
  });

eleventyConfig.addFilter('toMonth', nro => {
 return ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][nro]
})

return {
    templateFormats: ["md", "njk", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
