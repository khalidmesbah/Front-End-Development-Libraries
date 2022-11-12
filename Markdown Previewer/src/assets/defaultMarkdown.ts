const defaultMarkdown = `
> # Markdown
Lightweight Markup Language

> ## TABLE OF CONTENTS
- [FEATURES](#features)
- [WHERE IS USED?](#where-is-used)
- [HEADINGS](#headings)
- [HORIZONTAL RULES](#horizontal-rules)
- [TEXT FROMATTING](#text-fromatting)
- [BLOCKQUOTES](#blockquotes)
- [LISTS](#lists)
- [CODE FORMATTING](#code-formatting)
- [LINKS](#links)
- [IMAGES](#images)
- [TABLES](#tables)
- [TASK LISTS](#task-lists)
- [EMOJI](#emoji)
- [COMMENTS](#comments)
- [HTML & CSS](#html--css)
- [TOGGLE](#toggle)
- [CALLOUTS](#callouts)

## FEATURES
- readability 
- ease of use
- can be converted into HTML/XHTML and other formats
- Lightweight Markup Language with a plain text fromating syntax
- supports escape characters

## WHERE IS USED?
- documentations
- forums & blog posts
- readme files
- static site generetors

## HEADINGS
the # is the biggest heading & the ###### is the smallest heading

#header1 === \<h1 id="header">header1\</h1>

##header2 === \<h2 id="header">header2\</h2>

###header3 === \<h3 id="header">header3\</h3>

####header4 === \<h4 id="header">header4\</h4>

#####header5 === \<h5 id="header">header5\</h5>

######header6 === \<h6 id="header">header6\</h6>

## HORIZONTAL RULES
- --- & ___ & *** are used to create a horizontal rule
## TEXT FROMATTING

*italic* = _italic_

**bold** = __bold__

***italic & bold*** = ___italic & bold___

**bold *italic* bold** = __bold _italic_ bold__

~~strikethrough text~~

## BLOCKQUOTES
>> hi
>>> hi
>>>> hi

## LISTS
<!-- ol -->
1. item 1
2. item 2
3. item 3
4. item 4
<!-- ul -->
* item 1
* item 2
- item 3
- item 4
+ item 5
+ item 6

## CODE FORMATTING

\`max()\`

\`\`\`js
console.log("hello universe!")
\`\`\`

## LINKS
- use %23 for # in the urls
- use %20 for the space character in the url
- ect...

using angle brackets :
<https://www.youtube.com>

using brackets & parentheses :
[text](url "text to appear on hover")

links to the same page
[heading 1](#heading-1)
[heading 2](#heading-2)

reference links (links as variables)

[resources]: https://youtu.be/ftOBvusMHjQ "the resources"
[ref link1][resources]

[ref link2][resources]

[ref link3][resources]

[ref link4][resources]

## IMAGES

![image](url)

[![image](url)](url)

[image]:https://media.istockphoto.com/photos/silhouettes-of-people-walking-into-light-picture-id164773693?b=1&k=20&m=164773693&s=170667a&w=0&h=QOl0s_vszGLU9I_-rjSQoI1Ln8fRLErMg3GChalr0Mw=

<!-- the name of the image is the name of the reference -->
![image]


![img][image]


## TABLES
:--- => align left

:---: => align center

---: => align right
| name          |  age  |     job |
| :------------ | :---: | ------: |
| khaled mesbah |  21   | student |

|     name      |  age  |   job   |
| :-----------: | :---: | :-----: |
| khaled mesbah |  21   | student |

## TASK LISTS

- [x] task 1
- [ ] task 2
* [ ] task 3
* [x] task 4

## EMOJI

:joy:
:tada:

## COMMENTS

[this is a comment]: #
or
<!-- this is a comment -->

## HTML & CSS

<h3><s style="color:red">hi</s></h3>

## TOGGLE

<details style='cursor:pointer;margin-block:20px;color:green'>
    <summary>🎉 this is a toggle </summary>
    this is the content
</details>


## CALLOUTS

>:bulb: **tip:** here is an important tip to remember 
`;

export default defaultMarkdown;
