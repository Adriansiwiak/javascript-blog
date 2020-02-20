/* eslint-disable no-prototype-builtins */
{
  'use strict';

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleTagSelector = '.post-tags a',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optAuthorListSelector = '.authors.list',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-';

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.posts .active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      titleList.innerHTML += linkHTML;
    }
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  function generateTags() {
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const tagList = article.querySelector(optArticleTagsSelector);
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');
      for (let tag of articleTagsArray) {
        const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li> ';
        tagList.innerHTML += linkHTML;
      }
    }
  }
  generateTags();

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999
    };
    for (let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }
  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  }
  calculateTagsParams();

  function generateTagsSidebar() {
    const allTags = [];
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');
      const tagsList = document.querySelector(optTagsListSelector);
      for (let tag of articleTagsArray) {
        if (allTags.hasOwnProperty(tag)) {
          allTags[tag] += 1;
        } else {
          allTags[tag] = 1;
        }
      }
      const tagsParams = calculateTagsParams(allTags);
      tagsList.innerHTML = '';
      for (let tag in allTags) {
        const linkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '"href="#tag-' + tag + '" >' + tag + '</a></li>';
        tagsList.innerHTML += linkHTML;
      }
    }
  }
  generateTagsSidebar();

  function generateAuthorsSidebar() {
    const allTags = [];
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const articleAuthor = article.getAttribute('data-author');
      const articleAuthorArray = articleAuthor.split(' ');
      const authorList = document.querySelector(optAuthorListSelector);

      for (let author of articleAuthorArray) {
        if (allTags.hasOwnProperty(author)) {
          allTags[author] += 1;
        } else {
          allTags[author] = 1;
        }
      }
      authorList.innerHTML = '';

      for (let articleAuthor in allTags) {
        const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + ' (' + allTags[articleAuthor] + ') </a></li>';
        authorList.innerHTML += linkHTML;
      }
    }
  }
  generateAuthorsSidebar();

  function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let activeTagLink of activeTagLinks) {
      activeTagLink.classList.remove('active');
    }
    const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let sameTagLink of sameTagLinks) {
      sameTagLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll(optArticleTagSelector, optArticleTagsSelector);
    for (let tagLink of tagLinks) {
      tagLink.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();


  function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const authorList = article.querySelector(optArticleAuthorSelector),
        articleAuthor = article.getAttribute('data-author'),
        linkHTML = '<a href="#author-' + articleAuthor + '"> by ' + articleAuthor + '</a>';
      authorList.innerHTML += linkHTML;
    }
  }
  generateAuthors();
  
  function authorClickHandler(event) {

    event.preventDefault();
    const clickedElement = event.target,
      href = clickedElement.getAttribute('href'),
      author = href.replace('#author-', ''),
      activeAuthors = document.querySelectorAll('a.active[href^="#author-"]'),
      authorLinks = document.querySelectorAll('p a[href^="#author-"]');
    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }
    for (let authorLink of authorLinks) {
      authorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }
  authorClickHandler();


  function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll(optArticleAuthorSelector);
    for (let authorLink of authorLinks) {
      authorLink.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();
}
