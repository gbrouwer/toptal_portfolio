#h1 Medical Augmented Reality

#h3 1 - Goal
#pg Even before COVID-19, telemedicine was already a rapidly growing medical domain. It reduces the amount of resources hospitals need to dedicate to patients (beds, waiting rooms, examination rooms) and reduces the burden on the patient who can stay at home with their condition. With the introduction of the camera and microphone also come new opportunities for innovation in automation, machine learning, and artificial intelligence. The following describes one such innovation my colleagues and I explored at Memorial Sloan Kettering Cancer Center. Specifically, I was interested in how useful augmented reality (AR) and computer vision were in a mobility assessment setting.

#im ../assets/medical_augmented_reality/1.png 50 512 Figure 1 - Sit to Stand exercise instructions

#h3 2 - Data
#pg After major surgery to the legs, pelvis, or torso, it is not uncommon for patients to suffer a temporary loss or reduced mobility. The patient needs to rehabilitate through physical exercises, and it is important for the clinician guiding this rehabilitation to have a good sense of any progress or setbacks the patient might experience. In a traditional setting, the patient would come to one of the outpatient treatment centers for a mobility assessment through various tests. One very common test of mobility is the sit-to-stand test. The patient is asked to sit upright on a chair, arms crossed over the chest, stand up, sit down again, and repeat this process for 30 seconds. The number of full sit-to-stands is useful for the clinician to track the patient's progress over time through multiple visits. In addition, the clinician can observe the patient's movement and determine what is causing the mobility to be impaired. For example, the patient might put much weight on one foot, rising asymmetrically, to unburden the other, perhaps a painful leg. Or the patient might show tremors, indicative perhaps of an overall muscle tone and strength loss. 

#im ../assets/medical_augmented_reality/2.png 50 256 Figure 2 - Position of the landmarks

#br
#pg All of these things are possible through telemedicine visits, but with some caveats. First and foremost, the environment in which the patient is performing the test is poorly controlled, at least from the clinician's point of view. Viewing a patient perform a sit-to-stand test through a webcam is perhaps the biggest bottleneck. In a hospital setting, the clinician can view the patient from multiple angles to better examine any issue in mobility. In a telemedicine setting, the patient is on screen, and the webcam allows the clinician only a single point of view. 

#im ../assets/medical_augmented_reality/3.gif 50 256 Figure 3 - Sit to stand exercise captured by our application, with the detected skeleton overlaid

#h3 3 - Technology
#pg My team and I built a mobile application using augmented reality and computer vision to automatically track the patient during the sit-to-stand and overlay this information on top of the video feed. Specifically, we used posture-recognition machine learning algorithms (IOS Vision toolbox) that track the location of several key body landmarks, primarily joints. This is similar to facial recognition, where key facial features (eyes, nose, mouth) are detected and tracked. Once detected in the image, the algorithm converts them into points in 3d space, creating a skeleton model. In addition, the landmarks and their connections can be overlayed on the video feed, increasing the information available to the clinician when viewing the feed. The resulting data (both the absolute and relative landmark positions over time) can be used to automatically count the number of completed sit-to-stands. However, more importantly, it allows the exercise to be a) replayed and b) replayed from any angle deemed informative. The skeleton model can be seen as it displaces from a side view, whereas the feed itself was only ever strictly from the front. Finally, by analyzing the relative positions over time, we can compute various medically relevant metrics. For example, how much tremor was observed? Or whether the patient performed the exercise asymmetrically. 

#im ../assets/medical_augmented_reality/4.png 50 256 Figure 4 - (Left) A normal displacement pattern for the left (black) and right knee (red) of a person performing a sit-to-stand. (Right) In the frequency domain, this revealed as a peak at the dominant frequent, the frequency of the sit-to-stands (about 14 per 30 seconds). 

#h3 4 - Analysis
#pg I analyzed the resulting data by transforming it into the time/frequency domain using the Fast Fourier Transform. The algorithms are not 100% accurate, and people differ in size and shape. In addition, the camera angle is likely to vary between sessions and definitely between different patients. Even when considered in relative terms, analyzing the data in the space/time domain is extremely hard and cumbersome. Converting the data into the frequency domain removes much of the ambiguity, leaving the dominant frequency and phase of each landmark. Based on conversations with the rehabilitation staff, I created three metrics that we deemed essential to assess progress or the need for possible medical intervention. First, outside of any medical relevance, I created a metric that measured the amount of noise in the measurement. I calculated noise as the ratio between the main component (the frequency at which the patient was performing the sit-to-stands) and the average across all other frequencies up to the Nyquist limit. The second metric was left-right asymmetry. I defined left-right asymmetry as the difference between the mean phase of the left landmarks and the mean phase of the right landmarks, divided by the maximum phase shift of 180 degrees. The more significant the difference between the phases on each side, the more they move out of phase in space and time by lifting the left side of the body consistently before the right side. Finally, I computed a tremor metric. This metric was similar to the noise metric. The difference was that it compared the main component with a specific range of other frequencies the clinicians indicated were usually observed in patient tremor. I tested these metrics on a number of my colleagues who would simulate these three scenarios and perform the sit-to-stand exercise normally. 

#br
#im ../assets/medical_augmented_reality/5.png 50 256 Figure 5 - (Left) An asymetric displacement pattern where the left knee (black) is out of phase with the right knee (red). This means that the patient is rising and sitting down again asymetrically, with one side of the body move up and downwards before the other side of the body. In the frequency domain, nothing has changed, both joints still cycle at the same frequency. It is when we look at the relative phase that we discover the asymetry

#h3 5 - Visualization
#pg Below I render the detected skeletal positions of 4 example exercises, using data recorded from our AR application on my colleagues. 

#br
#im ../assets/medical_augmented_reality/6.gif 50 384 Figure 6 - Replay Rendering of a noisy measurement (right), compared to a good measurement with a nominal sit-to-stand pattern (left). In this case, I dimmed the lights, making it much harder for the computer vision in the app to accurately track the joints from the camera input.

#br
#im ../assets/medical_augmented_reality/7.gif 50 384 Figure 7 - Replay Rendering of a measurement of a patient experiencing tremor (right), compared to a good measurement with a nominal sit-to-stand pattern (left). This was a simulated tremor, enacted by one of my colleagues.

#br
#im ../assets/medical_augmented_reality/8.gif 50 384 Figure 8 - Replay Rendering of a asymetric sit-to-stand (right), compared to a good measurement with a nominal sit-to-stand pattern (left). As before, this asymetry was acted out. 

#h3 6 - Impact
#pg Visualized in this way, with the metrics added, a wealth of data becomes available to the clinician that otherwise would not have been available during a telemedicine visit. In addition, the metrics can be computed automatically and stored for comparison with past and future measurements, giving the clinical staff a holistic and quantified overview of the progress made by the patient in regaining mobility after surgery. 

#h3 7 - Technologies Used

#br 
#it ../assets/logos/xcode.png 0 128 
#it ../assets/logos/ios.png 0 128 
#it ../assets/logos/objectivec.png 0 128 
#it ../assets/logos/swift.png 0 128 
#it ../assets/logos/arkit.png 25 128 
#it ../assets/logos/mlkit.png 25 128 
#it ../assets/logos/python.png 50 128
#it ../assets/logos/scipy.png 50 128
#it ../assets/logos/numpy.png 50 128
#it ../assets/logos/python.png 50 128


