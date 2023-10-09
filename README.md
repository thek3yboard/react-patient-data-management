# react-patient-data-management

## Instructions to run

1. Clone this repository: https://github.com/thek3yboard/react-patient-data-management

2. In the root folder run the following commands

`npm install` **to install dependencies**

`npm run dev` **to deploy the application locally**

3. In the terminal you will see the deployment URL

## Design Decisions

### App component

It's the app's starting point. I didn't create another component for this because it's a small project and I thought I didn't needed to.

In bigger applications I think it's better to have some sort of "Home" component separated from the App component.

### CreateRecordModal component

At first all the code in here was in the App component, but I separated it for better reading.

### PatientCards component

It has the Card component along with all it's logic including the grid.

The "Update Record" modal is there as well. I wanted to create another component for it because of modularization and to make it reusable.

In fact my original idea was to make only one "modal" component for both creation and modification of the patient records, but I wasn't able to do that in the given time.

## Tools

1. Vite

I built the app with Vite because it's faster than other compiling tools. Vite does not build your entire application before serving, instead, it builds the application on demand.

In this project it didn't make a big difference, but I used it because I prefer to be more accustomed to the more efficient technologies.

2. ESLint

Vite comes with this linter and I like it. I think it's great to use a linter.

## Libraries

1. React Bootstrap

React Bootstrap is the UI framework I used the most, I feel very comfortable with it so I went secure because I wanted to spend my time efficiently.

2. React Toastify

My go-to toast notification library.

3. DayJS

I didn't know this library. I just needed to format the creation date of the patient records and I found this one. It worked fine.