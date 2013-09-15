## Seo Single Page Application Demo

The goal of this project is to show different ways to deal with Search Engine Optimization (SEO) and Single Page Applications.

The web app is powered by nodejs at the server side, and angularjs at the client side, but any MVC framework (backbone, ember)
should work for the client.

### Structure

The project has several branches to provide :

1. The base web app : not SEO compliant
2. A solution based on JS code sharing on both side : SEO partially compliant, nodejs only
3. A solution based on phantomjs : SEO compliant but the app opens one more port
4. A solution based on jsdom : SEO compliant, but nodejs only

### Install

    ./bin/install

### Start web app

    node app

### Browse with a usual browser

    http://localhost:3000/

### Browse as a search robot

    ./bin/rob route_uri

route_uri :
* a => should return the content of the view and the evaluated partial a.html
* b => should return the content of the view and the evaluated partial b.html
* any other => should return the content of the view and the evaluated partial notFound.html

Enjoy !