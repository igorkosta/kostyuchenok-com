export const getReadingTime = (content) => {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

export const extractHeadings = (content) => {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    headings.push({ level, text, id });
  }
  
  return headings;
};

export const formatDate = (date) => {
  return date.toISOString().slice(0, 10);
};

export const formatMonthYear = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
};


