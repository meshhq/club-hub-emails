
# Club Hub Emails

This repository contains the source code and tooling needed to build rich content emails that can be sent by the ClubHub service. 

## Usage

Add the `club-hub-emails` library via NPM 

```
"club-hub-emails": "git+ssh://git@github.com:meshhq/club-hub-emails.git",
```

Import the library 

```
import * as emails from from 'club-hub-emails'
```

Build an HTML email template. 

```
const event = // Some event.
const club = // Some club.
const html = await CompileConfirmationEmail(event, club)
```

## Background

This project uses the [Zurb Foundation for Emails](https://foundation.zurb.com/emails.html) tool chain for building rich, responsive emails. This repository itself was bootstrapped by using the Zurb cli command.

```
foundation new --framework emails
```

## Getting Started

Install deps 

```
make deps
```

Run the test suite

```
make test
```

Create prod build

```
make build
```

## Working 

### Building Emails

The email templates code and configuration live in the `src/templates` directory. This directory contains the following:

| Directory |
|-----------|
| assets    | Assets for the email templates including scss files. 
| data      | Sample data used for rendering templates during development. 
| data-prod | Production data files. Used to add handlebars tags to template content for production builds. 
| helpers   | N/A
| layouts   | Base HTML template for all of our emails. 
| pages     | The individual template files. 
| partials  | Handlebars partials that are used in our templates. 

### Development Workflow

This project is outfitted with a sample sever that allows developers to view the HTML templates in the browser. To start the server, run the following:

```
make start
```

Once the server is started, a web page will appear which lists the individual templates contained in this project. The data that is used is contained in the `data` directory. Each email template should have a corresponding `.json` file for sample data. 

### Creating New Emails 

The only thing needed to create a new template is to add a new file to the `pages` directory. See the existing template files for guidance. 

### Data 

The Foundation email framework uses handlebars to support dynamic templates. In order to build HTML files locally, we supply sample json object to the email templates. The json objects live in the `data` directory. 

When it comes time to build production emails, we supply the same json object to the email templates, but instead of actual data, we provide additional handlebars tags. This allows us to build full email templates, complete with in-lined css, that still contain handlebars tags. This is a "hack" to make the Foundation emails truly dynamic at runtime. Our production json objects live in the `data-prod` directory. 