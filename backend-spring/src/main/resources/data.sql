INSERT INTO users (id, name, email, password) VALUES (1, 'Pickle Rick', 'rick@jira.guest', '$2a$10$7O2YGWgMf8xR6TetAuYUbuuTiyIzkqSnkegBO5Awe3.40P0E7o572');
INSERT INTO users (id, name, email, password) VALUES (2, 'Baby Yoda', 'yoda@jira.guest', '$2a$10$7O2YGWgMf8xR6TetAuYUbuuTiyIzkqSnkegBO5Awe3.40P0E7o572');
INSERT INTO users (id, name, email, password) VALUES (3, 'Lord Gaben', 'gaben@jira.guest', '$2a$10$7O2YGWgMf8xR6TetAuYUbuuTiyIzkqSnkegBO5Awe3.40P0E7o572');

INSERT INTO project (id, name, description, category, leader_id) VALUES (1, 'singularity 1.0', 'Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.', 'software', 1);

INSERT INTO project_user (project_id, user_id) values (1, 1);
INSERT INTO project_user (project_id, user_id) values (1, 2);
INSERT INTO project_user (project_id, user_id) values (1, 3);

INSERT INTO issues (summary, type, status, priority, description, estimate, time_spent, reporter_id, project_id)
VALUES
    (
        'This is an issue of type: Task.',
        'task',
        'backlog',
        'high',
        '<p>Your teams can collaborate in Jira applications by breaking down pieces of work into issues. Issues can represent tasks, software bugs, feature requests or any other type of project work.</p><p><br></p><h3>Jira Software&nbsp;(software projects) issue types:</h3><p><br></p><h1><strong>Bug </strong><span style="background-color: initial;">🐞</span></h1><p>A bug is a problem which impairs or prevents the functions of a product.</p><p><br></p><h1><strong>Story </strong><span style="color: rgb(51, 51, 51);">📗</span></h1><p>A user story is the smallest unit of work that needs to be done.</p><p><br></p><h1><strong>Task </strong><span style="color: rgb(51, 51, 51);">🗳</span></h1><p>A task represents work that needs to be done.</p>',
        8,
        4,
        2,
        1
    ),
    (
        'Click on an issue to see what''s behind it.',
        'task',
        'backlog',
        'low',
        '<h2>Key terms to know</h2><p><br></p><h3>Issues</h3><p>A Jira ''issue'' refers to a single work item of any type or size that is tracked from creation to completion. For example, an issue could be a feature being developed by a software team, a to-do item for a marketing team, or a contract that needs to be written by a legal team.</p><p><br></p><h3>Projects</h3><p>A project is, quite simply, a collection of issues that are held in common by purpose or context. Issues grouped into projects can be configured in a variety of ways, ranging from visibility restrictions to available workflows.</p><p><br></p><h3>Workflows</h3><p>Workflows represent the&nbsp;sequential&nbsp;path an issues takes from creation to completion. A basic workflow might look something like this:</p><p><br></p><p><img src="https://wac-cdn.atlassian.com/dam/jcr:6203a73b-f2a1-4d91-9587-bc4b7d822d6b/workflow_timeline_desktop-temporary.svg?cdnVersion=736" alt="Jira workflow diagram"></p><p><br></p><p>In this case, Open, Done, and the labels in between represent the status an issue can take, while the arrows represent potential transitions from one status to another.</p><p><br></p><h3>Agile</h3><p>Agile is not a Jira Software-specific term. It''s a work philosophy that originated in the software development field and has since expanded to a variety of other industries. While we won''t belabor the definition here (there are&nbsp;great resources for that!, agile emphasizes an iterative approach to work informed by customer feedback where delivery occurs incrementally and continuously. The ideal agile team can move quickly and adapt to changing requirements without missing much of a beat.</p><p><br></p><h3>Server</h3><p>With&nbsp;Jira Software Server,&nbsp;you host Jira Software on your own hardware and customize your setup however you''d like. This is generally the best option for teams who need to manage all the details,&nbsp;have stricter requirements for data governance,&nbsp;and don''t mind the additional complexity of hosting themselves.</p><p><br></p><p><img src="https://wac-cdn.atlassian.com/dam/jcr:4a1b934f-38b4-456e-b807-29e93935e00f/Server%20Cluster@2x.png?cdnVersion=736" alt="Data Center"></p><p><br></p><h3>Data Center</h3><p><br></p><h3>With&nbsp;Jira Software Data Center, you can host Jira Software on your own hardware or with IaaS vendors like&nbsp;<a href="https://www.atlassian.com/enterprise/data-center/aws" rel="noopener noreferrer" target="_blank">AWS</a>&nbsp;and&nbsp;<a href="https://www.atlassian.com/enterprise/data-center/azure" rel="noopener noreferrer" target="_blank">Azure</a>. This is generally the best option for enterprise teams who need uninterrupted access to Jira Software and performance at scale.</h3><p><br></p>',
        5,
        2,
        3,
        1
    ),
    (
        'Try dragging issues to different columns to transition their status.',
        'story',
        'backlog',
        'medium',
        '<p>An issue''s status indicates its current place in the project''s workflow. Here''s a list of the statuses that come with&nbsp;JIRA products, depending on what projects you''ve created on your site.</p><p><br></p><h3>Jira software issue statuses:</h3><p><br></p><h2><strong style="background-color: rgb(187, 187, 187);"> Backlog </strong></h2><p>The issue is waiting to be picked up in a future sprint.</p><p><br></p><h2><strong style="background-color: rgb(187, 187, 187);"> selected_for_development </strong></h2><p>The issue is open and ready for the assignee to start work on it.</p><p><br></p><h2><strong style="background-color: rgb(0, 102, 204); color: rgb(255, 255, 255);"> In Progress </strong></h2><p>This issue is being actively worked on at the moment by the assignee.</p><p><br></p><h2><strong style="background-color: rgb(0, 138, 0); color: rgb(255, 255, 255);"> Done </strong></h2><p>Work has finished on the issue.</p>',
        15,
        12,
        1,
        1
    ),
    (
        'You can use rich text with images in issue descriptions.',
        'story',
        'backlog',
        'lowest',
        '<h1><span style="color: rgb(51, 51, 51);">🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🍍 🥭 🥥 🥝 🍅 🍆 🥑 🥦 🥒 🥬 🌶 🌽 🥕 🥔 🍠 🥐 🍞 🥖 🥨 🥯 🧀 🥚 🍳 🥞 🥓 🥩 🍗 🍖 🌭 🍔 🍟 🍕 🥪 🥙 🌮 🌯 🥗 🥘 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🍤 🍙 🍚 🍘 🍥 🥮 🥠 🍢 🍡 🍧 🍨 🍦 🥧 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🧂 🍩 🍪 🌰 🥜 🍯 🥛 🍼 ☕️ 🍵 🥤 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹 🍾 🥄 🍴 🍽 🥣 🥡 🥢</span></h1>',
        4,
        4,
        1,
        1
    ),
    (
        'Each issue can be assigned priority from lowest to highest.',
        'task',
        'selected_for_development',
        'highest',
        '<p>An issue''s priority indicates its relative importance. The default priorities are listed below. Both the priorities and their meanings can be&nbsp;customized by your administrator to suit your organization.&nbsp;<a href="https://confluence.atlassian.com/adminjiracloud/configuring-statuses-resolutions-and-priorities-776636333.html" rel="noopener noreferrer" target="_blank">Learn more about configuring priorities and their descriptions</a>.</p><p><br></p><h3>Jira software issue priorities:</h3><p><br></p><h3><strong style="background-color: rgb(230, 0, 0); color: rgb(255, 255, 255);"> Highest </strong><strong style="color: rgb(255, 255, 255);"> </strong><span style="color: rgb(51, 51, 51);">⬆️</span></h3><p>This problem will block progress.</p><p><br></p><h3><strong style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> High </strong><strong style="color: rgb(255, 255, 255);"> </strong><span style="color: rgb(51, 51, 51);">⬆️</span></h3><p>Serious problem that could block progress.</p><p><br></p><h3><strong style="background-color: rgb(255, 153, 0); color: rgb(255, 255, 255);"> Medium </strong><strong style="color: rgb(255, 255, 255);"> </strong><span style="color: rgb(51, 51, 51);">⬆️</span></h3><p>Has the potential to affect progress.</p><p><br></p><h3><strong style="background-color: rgb(0, 138, 0); color: rgb(255, 255, 255);"> Low </strong><strong style="color: rgb(255, 255, 255);"> </strong><span style="color: rgb(51, 51, 51);">⬇️</span></h3><p>Minor problem or easily worked around.</p><p><br></p><h3><strong style="background-color: rgb(102, 185, 102); color: rgb(255, 255, 255);"> Lowest </strong><strong style="color: rgb(255, 255, 255);"> </strong><span style="color: rgb(51, 51, 51);">⬇️</span></h3><p>Trivial problem with little or no impact on progress.</p>',
        4,
        1,
        3,
        1
    ),
    (
        'Each issue has a single reporter but can have multiple assignees.',
        'story',
        'selected_for_development',
        'high',
        '<h2>Try assigning <u style="background-color: rgb(204, 232, 204);">Pickle Rick</u> to this issue. <span style="color: rgb(51, 51, 51);">🥒&nbsp;🥒&nbsp;🥒</span></h2><p><br></p>',
        6,
        3,
        2,
        1
    ),
    (
        'You can track how many hours were spent working on an issue, and how many hours remain.',
        'task',
        'in_progress',
        'lowest',
        '<p>Before you start work on an issue, you can set a time or other type of estimate to calculate how much work you believe it''ll take to resolve it. Once you''ve started to work on a specific issue, log time to keep a record of it.</p><p><br></p><ul><li>Open the issue and select&nbsp;••• &gt;&nbsp;Time tracking</li><li>Fill in the<strong>&nbsp;Time Spent</strong>&nbsp;field</li><li>Fill in the <strong>Time Remaining</strong> field and click Save</li></ul><p><br></p><h3><u style="background-color: initial;">That''s it!</u></h3><h1>💯💯</h1>',
        12,
        11,
        1,
        1
    ),
    (
        'Try leaving a comment on this issue.',
        'task',
        'done',
        'medium',
        '<p>Adding comments to an issue is a useful way to record additional detail about an issue, and collaborate with team members. Comments are shown in the&nbsp;<strong>Comments</strong>&nbsp;section when you&nbsp;<a href="https://confluence.atlassian.com/jira064/what-is-an-issue-720416138.html" rel="noopener noreferrer" target="_blank" style="color: rgb(0, 82, 204); background-color: rgb(255, 255, 255);">view an issue</a>.</p><p><br></p><ol><li>Open the&nbsp;<a href="https://confluence.atlassian.com/jira064/what-is-an-issue-720416138.html" rel="noopener noreferrer" target="_blank" style="color: rgb(0, 82, 204);">issue</a>&nbsp;on which to add your comment.</li><li>Click the&nbsp;<strong>Add a comment</strong>&nbsp;button.</li><li class="ql-indent-1"><img src="https://confluence.atlassian.com/s/en_GB/7901/af536c7c6dffcc1d697b914b797aa7f2f306b4f8/_/images/icons/emoticons/check.svg" alt="(tick)">&nbsp;<a href="https://confluence.atlassian.com/jira064/using-keyboard-shortcuts-720416165.html#UsingKeyboardShortcuts-issues" rel="noopener noreferrer" target="_blank" style="color: rgb(0, 82, 204);">Keyboard shortcut</a>:&nbsp;<strong>m</strong></li><li>In the&nbsp;<strong>Comment</strong>&nbsp;text box, type your comment, using as many lines as you require.&nbsp;<img src="https://confluence.atlassian.com/s/en_GB/7901/af536c7c6dffcc1d697b914b797aa7f2f306b4f8/_/images/icons/emoticons/check.svg" alt="(tick)">&nbsp;</li><li>Click the&nbsp;<strong>Save</strong>&nbsp;button to save the comment.</li></ol>',
        10,
        2,
        1,
        1
    );
