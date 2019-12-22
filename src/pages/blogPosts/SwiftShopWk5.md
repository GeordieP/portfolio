# Building Swift Shop - Week 5 (Dec 16 - Dec 21, 2019)

#### Dec 16, 2019

Almost no time to work on the project this week, only managed to refactor the new/edit product dialog to be slightly cleaner. The edit form's view model is now created as a property in the ProductPage view and passed down to the edit form during render. This allows ProductPage functions to call methods directly on the edit form model, meaning it can hide much of the logic and state for dealing with the dialog's new and edit modes.
