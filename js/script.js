{
  'use strict';
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
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';
  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
  function generateTags() {
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const taglist = article.querySelector(optArticleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');
      for(let tag of  articleTagsArray){
        console.log('tag:', tag);
        const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li> ';
        html = html + linkHTML + '';
      }
      taglist.innerHTML = html;
    }
  }
  generateTags();
  function tagClickHandler(event){
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
  function addClickListenersToTags(){
    const tagLinks = document.querySelectorAll('.post-tags .list a');
    for (let tagLink of tagLinks) {
      tagLink.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();
  function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      const authorLinkHTML = '<a href="#' + articleAuthor + '">' + articleAuthor + '</a>';
      html = html + authorLinkHTML;
      authorWrapper.innerHTML = html;
    }
  }
  generateAuthors();
}
