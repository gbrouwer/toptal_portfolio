#h1 Human Mobility Pattern Detection

#h3 1 - Goal and data used
#pg At the United Nations, I worked on The D4D-Senegal challenge, an open innovation data challenge on anonymous call patterns of Orange's mobile phone users in Senegal. The goal of the challenge is to help address society development questions in novel ways by contributing to the socio-economic development and well-being of the Senegalese population. I worked with a large mobile phone dataset based on Call Detail Records (CDR) of phone calls and text exchanges between more than 9 million customers of a large telecommunication company.

#h3 2 - Product
#pg I created an algorithm that captures both the regularities and anomali3es in the patterns of hum mobility. I extract the most common cell phone tower each user's phone connected to, from which the algorithm learned to output a 'surprise feature' as well as a probability of a transition between two separate towers from the input data. By tracking these metrics over time, the algorithm could detect both regular and anomalous patterns to alert humans. I designed the algorithm to guide infrastructural planning from the regularities it detects, load higher capacity roads our public transport. Second, the algorithm can serve as an early warning system of disruptive events involving many human beings. 

#im ../assets/d4d/1.png 50 256 Figure 1 - The algorithm accurately detected a few critical events marked by significant changes in human mobility patterns in Senegal for the period I had data. The algorithm also outputs a membership value to each Detected Pattern. In the case of large urban areas (left) or the annual Grand Magal of Touba (right). The algorithm also found Smaller and more local unexpected mobility in several cities throughout the year correlated with the political scandal around a key political figure was led to several periods of unrest in large cities at different points during the year (not shown).

#h3 3 - Impact
#pg My algorithm detected many expected and unexpected human mobility patterns during that year in Senegal. When put in production, it can detect new patterns long before humans observe them. Second, the algorithm was able to separate both the regular and irregular geographically.

#im ../assets/d4d/2.png 50 256 Figure 2 - As a byproduct, the algorithm I designed found geographically separated clusters that correspond to ethnic subpopulations in Senegal.

#h3 4 - Technologies Used
#br
#it ../assets/logos/python.png 0 96 
#it ../assets/logos/spark.png 0 96 
#it ../assets/logos/hadoop.png 0 96  
#it ../assets/logos/awsec2.png 0 96 






