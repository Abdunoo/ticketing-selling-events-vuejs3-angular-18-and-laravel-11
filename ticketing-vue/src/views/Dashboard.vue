<template>
  <section>
    <section class="bg-white">
      <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <!-- Content Section -->
        <div
          class="mr-auto place-self-center lg:col-span-7 transition-all duration-1000 ease-in-out transform hover:scale-105">
          <h1
            class="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-gray-900">
            Buy Your Tickets <br>For The Best Events!
          </h1>
          <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            Don't miss out on the hottest events near you! Book your tickets now with exclusive offers and enjoy an
            unforgettable experience.
          </p>
          <!-- Buttons -->
          <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4 transition-opacity duration-1000 hover:opacity-90">
            <a href="#browse-events"
              class="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-white bg-primary rounded-lg sm:w-auto hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
              Browse Events
            </a>
            <a href="#offers"
              class="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-200">
              View Special Offers
            </a>
          </div>
        </div>

        <!-- Image Section -->
        <div
          class="hidden lg:mt-0 lg:col-span-5 lg:flex transition-transform duration-1000 ease-in-out transform hover:scale-110">
          <img v-lazy="img3" alt="ticket promotion image"
            class="object-cover object-left">
        </div>
      </div>
    </section>
    <section class="bg-white">
      <div class="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
        <div class="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 sm:grid-cols-3 lg:grid-cols-6">
          <a href="#"
            class="flex items-center justify-center transition-transform duration-500 ease-in-out transform hover:scale-110">
            <img v-lazy="lst1" alt="Music Event"
              class="h-12 w-12 object-cover object-center rounded-full">
          </a>
          <a href="#"
            class="flex items-center justify-center transition-transform duration-500 ease-in-out transform hover:scale-110">
            <img v-lazy="lst2" alt="Sports Event"
              class="h-12 w-12 object-cover object-center rounded-full">
          </a>
          <a href="#"
            class="flex items-center justify-center transition-transform duration-500 ease-in-out transform hover:scale-110">
            <img v-lazy="lst3" alt="Theater Event"
              class="h-12 w-12 object-cover object-center rounded-full">
          </a>
          <a href="#"
            class="flex items-center justify-center transition-transform duration-500 ease-in-out transform hover:scale-110">
            <img v-lazy="lst4" alt="Comedy Show"
              class="h-12 w-12 object-cover object-center rounded-full">
          </a>
          <a href="#"
            class="flex items-center justify-center transition-transform duration-500 ease-in-out transform hover:scale-110">
            <img v-lazy="lst5" alt="Festival"
              class="h-12 w-12 object-cover object-center rounded-full">
          </a>
          <a href="#"
            class="flex items-center justify-center transition-transform duration-500 ease-in-out transform hover:scale-110">
            <img v-lazy="lst6" alt="Partner Logo"
              class="h-12 w-12 object-cover object-center rounded-full">
          </a>
        </div>
      </div>
    </section>
    <section class="bg-gray-50">
      <div class="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
        <!-- Row 1 -->
        <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          <div
            class="text-gray-500 sm:text-lg translate-y-10 transition duration-1000 delay-300 ease-in-out transform hover:scale-105">
            <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">
              Seamless Ticket Purchasing
            </h2>
            <p class="mb-8 font-light lg:text-xl">
              Buy tickets for your favorite concerts, sports, and theater events
              with ease. Enjoy fast and secure transactions with personalized
              recommendations based on your preferences.
            </p>
            <!-- List -->
            <ul role="list" class="pt-8 space-y-5 border-t border-gray-200 my-7">
              <li class="flex space-x-3">
                <!-- Icon -->
                <svg class="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="text-base font-medium leading-tight text-gray-900">Instant Digital Tickets</span>
              </li>
              <li class="flex space-x-3">
                <!-- Icon -->
                <svg class="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="text-base font-medium leading-tight text-gray-900">Secure Checkout</span>
              </li>
              <li class="flex space-x-3">
                <!-- Icon -->
                <svg class="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="text-base font-medium leading-tight text-gray-900">Event Reminders</span>
              </li>
            </ul>
            <p class="mb-8 font-light lg:text-xl">
              Stay up-to-date with the latest events and never miss out on a
              ticket sale again.
            </p>
          </div>
          <img
            class="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex transition duration-1000 ease-in-out transform translate-y-10 opacity-0 lg:opacity-100 lg:hover:scale-105"
            v-lazy="ticketPurchase" alt="Ticket Purchase Feature" />
        </div>

        <!-- Row 2 -->
        <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          <img
            class="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex transition duration-1000 ease-in-out transform translate-y-10 opacity-0 lg:opacity-100 lg:hover:scale-105"
            v-lazy="eventRecommendations" alt="Event Recommendations Feature" />
          <div
            class="text-gray-500 sm:text-lg translate-y-10 transition duration-1000 delay-300 ease-in-out transform hover:scale-105">
            <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">
              Personalized Event Recommendations
            </h2>
            <p class="mb-8 font-light lg:text-xl">
              Get personalized event suggestions based on your preferences, so
              you'll always know about the events you're most interested in.
            </p>
            <!-- List -->
            <ul role="list" class="pt-8 space-y-5 border-t border-gray-200 my-7">
              <li class="flex space-x-3">
                <!-- Icon -->
                <svg class="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="text-base font-medium leading-tight text-gray-900">Curated Events for You</span>
              </li>
              <li class="flex space-x-3">
                <!-- Icon -->
                <svg class="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="text-base font-medium leading-tight text-gray-900">Upcoming Local Events</span>
              </li>
              <li class="flex space-x-3">
                <!-- Icon -->
                <svg class="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="text-base font-medium leading-tight text-gray-900">Early Access to Tickets</span>
              </li>
            </ul>
            <p class="font-light lg:text-xl">
              Never miss out on the most popular events with our personalized
              suggestions and early access features.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white">
      <div
        class="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
        <div class="col-span-2 mb-8 transform transition-transform duration-500 hover:scale-105">
          <p class="text-lg font-medium text-purple-600">Trusted by Event Organizers Worldwide</p>
          <h2 class="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl">Join over 600 million
            users and 10,000 event teams</h2>
          <p class="font-light text-gray-500 sm:text-xl">We prioritize security and reliability, ensuring smooth
            transactions and exceptional service for every event.</p>
          <div class="pt-6 mt-6 space-y-4 border-t border-gray-200">
            <div>
              <a href="#"
                class="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 transition-colors duration-300">
                Explore Security Features
                <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
            <div>
              <a href="#"
                class="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 transition-colors duration-300">
                Learn More About Our Platform
                <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
          <div class="transform transition-transform duration-500 hover:scale-105">
            <svg class="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                clip-rule="evenodd"></path>
            </svg>
            <h3 class="mb-2 text-2xl font-bold">99.99% uptime</h3>
            <p class="font-light text-gray-500">Zero downtime, ensuring a seamless ticket purchasing experience</p>
          </div>
          <div class="transform transition-transform duration-500 hover:scale-105">
            <svg class="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
              </path>
            </svg>
            <h3 class="mb-2 text-2xl font-bold">600M+ Users</h3>
            <p class="font-light text-gray-500">Millions of satisfied ticket buyers worldwide</p>
          </div>
          <div class="transform transition-transform duration-500 hover:scale-105">
            <svg class="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                clip-rule="evenodd"></path>
            </svg>
            <h3 class="mb-2 text-2xl font-bold">100+ countries</h3>
            <p class="font-light text-gray-500">Tickets sold for events across the globe</p>
          </div>
          <div class="transform transition-transform duration-500 hover:scale-105">
            <svg class="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z">
              </path>
            </svg>
            <h3 class="mb-2 text-2xl font-bold">5+ Million</h3>
            <p class="font-light text-gray-500">Transactions processed every day</p>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-gray-50">
      <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 lg:py-24">
        <div class="mx-auto text-center mb-10 lg:mb-16">
          <h2 class="mb-4 text-3xl font-extrabold text-gray-900">Get started with us today</h2>
          <p class="mb-5 font-light text-gray-500 sm:text-xl">Create an account to enjoy seamless ticket management for
            your events.</p>
        </div>
        <div class="flex justify-center">
          <a href="#"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-300">
            Create Your Account
            <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
    <section class="bg-white">
      <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
        <div class="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
          <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">
            Flexible Ticket Pricing
          </h2>
          <p class="mb-5 font-light text-gray-500 sm:text-xl">
            Choose the perfect plan for your event, from small gatherings to large festivals.
          </p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <!-- Pricing Card - Basic Plan -->
          <div
            class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow xl:p-8 transition-transform transform hover:scale-105 duration-300">
            <h3 class="mb-4 text-2xl font-semibold">Basic</h3>
            <p class="font-light text-gray-500 sm:text-lg">
              Ideal for small events with basic ticketing needs.
            </p>
            <div class="flex items-baseline justify-center my-8">
              <span class="mr-2 text-5xl font-extrabold">$29</span>
              <span class="text-gray-500">/event</span>
            </div>
            <ul role="list" class="mb-8 space-y-4 text-left">
              <li class="flex items-center space-x-3">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>Online Ticket Sales</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>Real-time Analytics</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>Customer Support</span>
              </li>
            </ul>
            <a href="#"
              class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Get
              started</a>
          </div>

          <!-- Pricing Card - Professional Plan -->
          <div
            class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow xl:p-8 transition-transform transform hover:scale-105 duration-300">
            <h3 class="mb-4 text-2xl font-semibold">Professional</h3>
            <p class="font-light text-gray-500 sm:text-lg">
              For mid-sized events needing more advanced features.
            </p>
            <div class="flex items-baseline justify-center my-8">
              <span class="mr-2 text-5xl font-extrabold">$99</span>
              <span class="text-gray-500">/event</span>
            </div>
            <ul role="list" class="mb-8 space-y-4 text-left">
              <li class="flex items-center space-x-3">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>All Basic Features</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>Custom Branding</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>Priority Support</span>
              </li>
            </ul>
            <a href="#"
              class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Get
              started</a>
          </div>

          <!-- Pricing Card - Enterprise Plan -->
          <div
            class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow xl:p-8 transition-transform transform hover:scale-105 duration-300">
            <h3 class="mb-4 text-2xl font-semibold">Enterprise</h3>
            <p class="font-light text-gray-500 sm:text-lg">
              Perfect for large events with complex ticketing needs.
            </p>
            <div class="flex items-baseline justify-center my-8">
              <span class="mr-2 text-5xl font-extrabold">$499</span>
              <span class="text-gray-500">/event</span>
            </div>
            <ul role="list" class="mb-8 space-y-4 text-left">
              <li class="flex items-center space-x-3">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>All Professional Features</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>Dedicated Account Manager</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>Custom Integrations</span>
              </li>
            </ul>
            <a href="#"
              class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Get
              started</a>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-gray-100 py-8">
      <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
        <div class="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
          <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>
        <div class="space-y-4">
          <div class="transition-opacity duration-500 ease-in-out hover:opacity-100">
            <h3 class="text-xl font-semibold text-gray-900">What is included in the Basic Plan?</h3>
            <p class="mt-2 text-gray-600">The Basic Plan includes online ticket sales, real-time analytics, and customer
              support.</p>
          </div>
          <div class="transition-opacity duration-500 ease-in-out hover:opacity-100">
            <h3 class="text-xl font-semibold text-gray-900">Can I customize the branding?</h3>
            <p class="mt-2 text-gray-600">Branding customization is available in the Professional and Enterprise plans.
            </p>
          </div>
          <div class="transition-opacity duration-500 ease-in-out hover:opacity-100">
            <h3 class="text-xl font-semibold text-gray-900">How can I get support?</h3>
            <p class="mt-2 text-gray-600">Support is included in all plans, with priority support available in the
              Professional and Enterprise plans.</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { useHead } from "@vueuse/head";
import { ref } from "vue";
import img3 from '@/assets/image/img3.webp';
import lst1 from '@/assets/image/lst1.webp';
import lst2 from '@/assets/image/lst2.webp';
import lst3 from '@/assets/image/lst3.webp';
import lst4 from '@/assets/image/lst4.webp';
import lst5 from '@/assets/image/lst5.webp';
import lst6 from '@/assets/image/lst6.webp';
import ticketPurchase from '@/assets/image/ticket-purchase.webp';
import eventRecommendations from '@/assets/image/event-recommendations.webp';

export default {
  setup() {
    const testimonials = ref([
      { id: 1, name: "John Doe", event: "Rock Concert", feedback: "Amazing experience! Loved every second." },
      { id: 2, name: "Jane Smith", event: "Comedy Show", feedback: "Hilarious! I couldn’t stop laughing." },
      { id: 3, name: "Sam Lee", event: "Jazz Festival", feedback: "The music was incredible and the atmosphere was perfect." },
    ]);

    useHead({
      title: 'Buy Tickets for the Best Events - Ticketku Web Application',
      meta: [
        { name: 'description', content: 'Book tickets for concerts, sports, and theater events with exclusive offers and secure checkout.' },
        { name: 'keywords', content: 'tickets, events, concerts, theater, sports, exclusive offers, secure checkout, event reminders' },
        { property: 'og:title', content: 'Buy Tickets for the Best Events' },
        { property: 'og:description', content: 'Get instant digital tickets, secure checkout, and personalized recommendations for the best events near you!' },
        { property: 'og:image', content: '/src/assets/image/ticket-purchase.webp' },
        { property: 'og:url', content: 'https://sandbox2.panemu.com/ticketing/' },
        { property: 'og:type', content: 'website' },
      ],
    });

    return {
      testimonials,
      img3,
      lst1,
      lst2,
      lst3,
      lst4,
      lst5,
      lst6,
      ticketPurchase,
      eventRecommendations,
    };
  },
};
</script>
