+++
title = "Forecasting a new project"
banner = "img/banners/tutorial-list-new-project.jpg"
type = "tutorial"
+++

In this tutorial, you learn on how to use PaceMaker to forecasts potential delivery dates as well as the potential number of features for a new project. In 5 minutes, you will learned the basic parameters to configure your simulations which will render your forecasts.

<!--more--> 

## Starting a new project

It can be hard to answer the age-old question **"When will it be done?"** when you start a new project. You might face a lot of unknowns. How many people will you have? Will more get added? What is the list of requirements? PaceMaker simplifies this complexity by taking only a few parameters to generate forecasts.

## Configurating your forecasts

Our first step is to tell PaceMaker at what rate your teams will complete/deliver features. Some teams will go at a weekly pace while other teams will resolve issues by the day.

![Throughput frequency](/img/tutorials/np-throughput-frequency.png)

 To help you decide which frequency to choose, here's our recommandation based on the nature of the work:

* **Week**: Your team works on user stories/requirements/items that usually take a few days to complete.
* **Day**: The customer requests are mainly bug fixes or small demands that are resolved within a few hours.
* **Hour**: This setting is not supported yet. 

Once we've set at what pace (or throughput) our team will deliver features, we have to define how many of them will be delivered. PaceMaker asks us to define the minimum and maximum number of features that can be done in an mount of time.

For example, let's say we have a new project starting and we don't really know who will be on the team. We know the requirements are being written as stories and by experience in the company, we know stories are done in a few days. We pick *Week* the dropdown menu.

We now have to estimate the minimum and maximum number of items that will be completed by our new team for this new project. To play it safe, let's say our team can deliver a minimum of 0 items per week.

![Minimum number of items](/img/tutorials/np-minimum-features.png)

And we might feel that on some occasions, the team will go quite fast so we set the maximum number of items to 5.

![Maximum number of items](/img/tutorials/np-maximum-features.png)

These minimum and maximum are useful to PaceMaker as it will use thos values to generate simulations to create its forecasts later on.

We then turn to our customer when she wants her new software delivered to her. Through that conversation, we set the delivery date required by our customer. To do so, click anywhere in the date label.

![Delivery date](/img/tutorials/np-date-label.png)

This will bring the date calendar upfront.

![Calendar](/img/tutorials/np-calendar.png)

Pick the expected delivery date and click the Close button. Following up on our new project team from above, we could say they have to deliver this project for Friday, May 26th.

![Delivery date set](/img/tutorials/np-date-label-set.png)

Finally, we might alreay know the number of items to deliver. In some situations, your team might have an obligation to deliver a fixed number of items. This can happen in fixed bid contract for example where the contract stipulates the requirements in details. For example, we might have a fixed bid project where we have 45 items to deliver to our customer.

![Delivery date set](/img/tutorials/np-number-items.png)

If this value is not known at the time of generating your forecasts, simply put a random number. Later on, when you compare your initial forecasts with a new one, you can change this value.

## Creating the forecasts

We've completed setting up our inputs for PaceMaker. It will run its simulations when you click the green **Create forecasts** button and generate your forecasts.  

![Create the forecasts](/img/tutorials/create-forecasts-btn.png)

Your forecasts are generated instantly in the result panel under the **Create forecasts** button. To understand them, head to the [next tutorial](/understand-forecasts/) which explains how to read the forecasts.